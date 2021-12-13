import { useReducer } from 'react';
import PropTypes from 'prop-types';

import { ModalGrid, InputForm, SelectForm } from 'components';
import { TYPE_PAYMENT } from '../../../constants';

const EditTotalsModalView = ({
  show,
  setShow,
  total,
  iva,
  taxBase,
  update,
  id,
  type,
  paymentType,
  onlyTotal = false,
}) => {
  const [state, setState] = useReducer(
    (oldState, newState) => ({ ...oldState, ...newState }),
    {
      total,
      iva,
      taxBase,
      paymentType,
    },
  );

  const [errors, setErrors] = useReducer(
    (oldState, newState) => ({ ...oldState, ...newState }),
    {
      total: false,
      iva: false,
      taxBase: false,
    },
  );

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
    const number = parseFloat(value);
    setState({ [name]: number });
    setErrors({ [name]: (typeof number !== 'number') });
  };

  /**
   * Handle change select
   * @param {String} string
   * @private
   */
  const _handleSelect = ({ target: { value } }) => {
    setState({ paymentType: value });
  };

  const _close = () => {
    setShow(false);
  };

  const _handleSubmit = () => {
    update({
      id,
      type,
      newData: { totals: state },
      callback: _close,
    });
  };

  /**
   * Handle press enter key
   * @param {string} key
   * @private
   */
  const _handleKeyPress = ({ key }) => {
    if (key === 'Enter') _handleSubmit();
  };

  /**
   * Render a input element
   * @param {string} name
   * @param {String} label
   * @returns {InputForm}
   * @private
   */
  const _renderInput = (name, label) => (
    <InputForm
      value={state[name] || 0}
      onChange={_handleChange}
      name={name}
      label={label}
      InputLabelProps={{
        shrink: true,
      }}
      type='number'
      size={4}
      onKeyPress={_handleKeyPress}
      error={errors[name]}
    />
  );

  return (
    <ModalGrid
      show={show}
      setShow={setShow}
      title='Editar totales'
      action={_handleSubmit}
    >
      {!onlyTotal && _renderInput('taxBase', 'Base imponible')}
      {!onlyTotal && _renderInput('iva', 'IVA')}
      {_renderInput('total', 'Total')}
      {onlyTotal && (
      <SelectForm
        label='Forma de pago'
        value={state.paymentType}
        onChange={_handleSelect}
        size={4}
        InputLabelProps={{
          shrink: true,
        }}
        onKeyPress={_handleKeyPress}
      >
        {TYPE_PAYMENT?.map(item => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </SelectForm>
      )}
    </ModalGrid>
  );
};

EditTotalsModalView.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  total: PropTypes.number,
  iva: PropTypes.number,
  taxBase: PropTypes.number,
  id: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  type: PropTypes.string,
  onlyTotal: PropTypes.bool,
  paymentType: PropTypes.string,
};

EditTotalsModalView.displayName = 'EditTotalsModalView';
export const story = EditTotalsModalView;
export default EditTotalsModalView;
