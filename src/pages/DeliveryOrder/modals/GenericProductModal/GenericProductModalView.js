import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { InputForm, ModalGrid, SelectForm } from 'components';
import { Typography, Box } from '@material-ui/core';

const GenericProductModal = ({
  show, close, products, state, setState, ...rest
}) => {
  if (!products?.length) {
    return (
      <ModalGrid
        show={show}
        close={close}
        title="Añadir producto"
      >
        <Box p={3}>
          <Typography variant="h5">
            El proveedor no tiene productos
          </Typography>
        </Box>
      </ModalGrid>
    );
  }

  /**
   * Handle change select
   * @param {String} value
   * @private
   */
  const _handleSelect = ({ target: { value } }) => {
    const selected = products.find(product => product._id === value);
    setState({
      product: value,
      code: selected?.code,
    });
  };

  /**
   * Handle event onChange input
   * @param {String} name
   * @param {String} value
   * @private
   */
  const _handleChange = ({ target: { name, value } }) => {
    setState({ [name]: value });
  };

  /**
   * Handle event onChange input
   * @param {String} name
   * @param {String} value
   * @private
   */
  const _handleChangeCode = ({ target: { value } }) => {
    const selected = products.find(product => product.code === value);
    setState({
      code: value,
      product: selected?._id || '',
    });
  };

  /**
   * Handle press enter key
   * @param {string} key
   * @private
   */
  const _handleKeyPress = ({ key }) => {
    const { actions } = rest;
    // eslint-disable-next-line
    if (key === 'Enter') actions[actions.length - 1].onClick();
  };

  /**
   * Render a input element
   * @param {string} name
   * @param {String} label
   * @param {Object} options
   * @returns {InputForm}
   * @private
   */
  const _renderInput = (name, label, options = {}) => (
    <InputForm
      value={state[name] || ''}
      onChange={_handleChange}
      name={name}
      label={label}
      InputLabelProps={{
        shrink: true,
      }}
      onKeyPress={_handleKeyPress}
      {...options}
    />
  );

  /**
   * Render select product
   * @return {SelectForm}
   * @private
   */
  const _renderSelectProduct = () => (
    <SelectForm
      label="Selecciona un producto"
      value={state.product}
      name="provider"
      onChange={_handleSelect}
      disabled={!products?.length}
      size={6}
      InputLabelProps={{
        shrink: true,
      }}
      onKeyPress={_handleKeyPress}
    >
      <option value="">--------</option>
      {products?.map((item, idx) => (
        <option key={idx} value={item._id}>
          {item.name}
        </option>
      ),
      )}
    </SelectForm>
  );

  return (
    <ModalGrid
      show={show}
      close={close}
      {...rest}
    >
      {_renderInput('code', 'Código', { onChange: _handleChangeCode })}
      {_renderSelectProduct()}
      {_renderInput('quantity', 'Peso / Cantidad', { type: 'number' })}
      {_renderInput('price', 'Precio', { type: 'number' })}
    </ModalGrid>
  );
};

GenericProductModal.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  products: PropTypes.array.isRequired,
  state: PropTypes.object.isRequired,
  setState: PropTypes.func.isRequired,
};

GenericProductModal.displayName = 'GenericProductModal';
export const story = GenericProductModal;
export default memo(GenericProductModal);
