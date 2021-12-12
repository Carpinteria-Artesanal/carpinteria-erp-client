/* eslint-disable react/prop-types */
import {
  useEffect, useMemo, useReducer, useRef,
} from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { AutocompleteForm, InputForm, ModalGrid } from 'components';
import { addNotification } from 'reducers/notifications';
import { fields, INITIAL_STATE } from './constants';

const ProductOrderModal = ({
  show,
  close,
  action,
  createProduct,
  invoice,
  updateProduct,
  products,
  type,
  ...rest
}) => {
  const dispatch = useDispatch();
  const inputCode = useRef(null);
  const [state, setState] = useReducer(
    (oldState, newState) => ({ ...oldState, ...newState }),
    INITIAL_STATE,
  );
  const productsList = useMemo(() => products.map(p => p.name), [products]);

  useEffect(() => {
    if (!show) setState(INITIAL_STATE);
    else if (typeof show !== 'boolean') setState(show);
  }, [show]);

  /**
   * Handle event onChange input
   * @param {String} name
   * @param {String} value
   * @private
   */
  const _handleChange = ({
    target: {
      name,
      value,
    },
  }) => {
    setState({ [name]: value });
  };

  /**
   * Handle event save button
   * @private
   */
  const _handleSubmit = () => {
    try {
      const model = {
        name: state.name,
        price: Number(state.price),
        unit: Number(state.unit),
        iva: Number(state.iva),
      };
      (typeof show === 'boolean' ? createProduct : updateProduct)({
        type,
        model,
        invoice,
        product: show?._id,
      }, close);
    } catch (e) {
      console.error(e);
      dispatch(addNotification({
        level: 'error',
        message: 'El precio o las unidades no son correctas',
        dismissible: true,
      }));
    }
  };

  /**
   * Handle press enter key
   * @param {string} key
   * @private
   */
  const _handleKeyPress = ({ key }) => {
    if (key === 'Enter') _handleSubmit();
  };

  const _handleChangeAutocomplete = value => {
    setState({ name: value });
    const selectedProduct = products.find(p => p.name === value);
    if (selectedProduct) setState({ price: selectedProduct?.price, code: selectedProduct?.code });
  };

  const _handleChangeCode = ({ target: { value } }) => {
    const selected = products.find(product => product.code === value);
    setState({
      code: value,
      name: selected?.name || '',
      price: selected?.price,
    });
  };

  const _renderAutocomplete = () => (
    <AutocompleteForm
      disableClearable
      options={productsList}
      value={state.name}
      label='Nombre'
      margin='normal'
      onChange={_handleChangeAutocomplete}
      autoFocus
    />
  );

  /**
   * Render a input element
   * @param {string} id
   * @param {String} label
   * @param {Object} options
   * @returns {JSX.Element}
   * @private
   */
  const _renderInput = ({
    id,
    label,
    ...options
  }) => (
    <InputForm
      key={id}
      value={state[id] || ''}
      onChange={_handleChange}
      name={id}
      label={label}
      onKeyPress={_handleKeyPress}
      {...options}
    />
  );

  return (
    <ModalGrid
      show={Boolean(show)}
      close={close}
      action={_handleSubmit}
      title={typeof show === 'boolean' ? 'Añadir producto' : `Editar ${show.name}`}
      {...rest}
    >
      {_renderInput({
        id: 'code',
        label: 'Código',
        onChange: _handleChangeCode,
        autoFocus: true,
        inputRef: inputCode,
      })}
      {_renderAutocomplete()}
      {fields.map(_renderInput)}
    </ModalGrid>
  );
};

ProductOrderModal.propTypes = {
  show: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  close: PropTypes.func.isRequired,
  createProduct: PropTypes.func.isRequired,
  invoice: PropTypes.string.isRequired,
  product: PropTypes.object,
  products: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
};

ProductOrderModal.displayName = 'ProductOrderModal';
export const story = ProductOrderModal;
export default ProductOrderModal;
