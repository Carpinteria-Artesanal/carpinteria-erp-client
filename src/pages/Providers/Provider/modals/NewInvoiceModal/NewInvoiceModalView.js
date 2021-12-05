/* eslint-disable react/prop-types */
import { memo, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';

import {
  DatePickerForm, InputForm, ModalGrid, SelectForm,
} from 'components';
import { format } from 'utils';
import { COLUMNS_INVOICES, INVOICES_CONCEPTS, TYPE_PAYMENT } from 'constants/invoices';
import AutocompleteForm from 'components/Forms/AutocompleteForm';

const INITIAL_STATE = {
  nInvoice: '',
  dateInvoice: null,
  dateRegister: null,
  total: '',
  concept: INVOICES_CONCEPTS[0],
  type: TYPE_PAYMENT[0],
  bookColumn: '',
  paymentDate0: null,
  paymentDate1: null,
  paymentDate2: null,
  paymentDate3: null,
  amount0: null,
  amount1: null,
  amount2: null,
  amount3: null,
};

const NewInvoiceModal = ({
  show, close, createInvoiceExpense, idProvider,
}) => {
  const [state, setState] = useReducer(
    (oldState, newState) => ({ ...oldState, ...newState }),
    INITIAL_STATE
  );

  useEffect(() => {
    if (!show) setState(INITIAL_STATE);
  }, [show]);

  /**
   * Handle event save button
   * @private
   */
  const _handleSubmit = () => {
    const {
      nInvoice,
      dateInvoice,
      dateRegister,
      total,
      concept,
      paymentDate0,
      paymentDate1,
      paymentDate2,
      paymentDate3,
      type,
      bookColumn,
      amount0,
      amount1,
      amount2,
      amount3,
    } = state;

    const payments = [
      { paymentDate: format.dateToSend(paymentDate0), amount: amount0 },
      { paymentDate: format.dateToSend(paymentDate1), amount: amount1 },
      { paymentDate: format.dateToSend(paymentDate2), amount: amount2 },
      { paymentDate: format.dateToSend(paymentDate3), amount: amount3 },
    ].filter(payment => payment.amount);

    createInvoiceExpense({
      nInvoice,
      dateInvoice: format.dateToSend(dateInvoice),
      dateRegister: format.dateToSend(dateRegister),
      total: Number(total),
      provider: idProvider,
      concept,
      type,
      bookColumn,
      payments,
    }, close);
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
   * Handle event onChange input
   * @param {String} name
   * @param {String} value
   * @private
   */
  const _handleChange = ({ target: { name, value } }) => {
    setState({ [name]: value });
  };

  /**
   * Handle change picker
   * @param {String} date
   * @param {String} name
   * @private
   */
  const _handleChangePicker = (date, name) => {
    setState({ [name]: date });
  };

  /**
   * Handle change picker
   * @param {String} date
   * @param {String} name
   * @private
   */
  const _handleChangeAutocomplete = value => {
    setState({ concept: value });
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
      onKeyPress={_handleKeyPress}
      {...options}
    />
  );

  /**
   * Render select product
   * @param {string} id
   * @param {string} label
   * @param {string[]} items
   * @param {number} size
   * @return {SelectForm}
   * @private
   */
  const _renderSelect = ({
    id, label, items, size,
  }) => (
    <SelectForm
      label={label}
      value={state[id]}
      name={id}
      onChange={_handleChange}
      size={size || 4}
      InputLabelProps={{
        shrink: true,
      }}
      onKeyPress={_handleKeyPress}
    >
      {items.map(item => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </SelectForm>
  );

  /**
   * Renderiza un datepicker con opciones predeterimnadas
   * @param {String} label
   * @param {String} name
   * @return {DatePickerForm}
   * @private
   */
  const _renderDatePicker = (label, name, options) => (
    <DatePickerForm
      clearable
      size={options?.size || 4}
      label={label}
      value={state[name]}
      onAccept={date => _handleChangePicker(date, name)}
    />
  );

  // eslint-disable-next-line react/no-unstable-nested-components
  const _renderAutocomplete = () => (
    <AutocompleteForm
      disableClearable
      options={INVOICES_CONCEPTS}
      value={state.concept}
      name='concept'
      label='Concepto'
      margin='normal'
      onChange={_handleChangeAutocomplete}
      size={4}
    />
  );

  const _renderPayment = (pass, index) => (
    <>
      {_renderDatePicker(`Fecha de cobro ${index + 1}`, `paymentDate${index}`, { size: 6 })}
      {_renderInput(`amount${index}`, `Cantidad ${index + 1}`, { type: 'number' })}
    </>
  );

  /**
   * Fecha de factura
   * N factura
   * Fecha de registro
   * Base imponible
   * IVA
   * Retención
   * Total
   */
  return (
    <ModalGrid
      show={show}
      close={close}
      action={_handleSubmit}
      title='Crear factura'
    >
      {_renderInput('nInvoice', 'Nº Factura', { autoFocus: true, size: 4 })}
      {_renderDatePicker('Fecha de registro', 'dateRegister', { size: 4 })}
      {_renderDatePicker('Fecha de factura', 'dateInvoice')}
      {_renderInput('total', 'Total', { type: 'number', size: 4 })}
      {_renderAutocomplete()}
      {_renderSelect({ id: 'bookColumn', label: 'Columna', items: Object.keys(COLUMNS_INVOICES) })}
      {_renderSelect({
        id: 'type', label: 'Tipo de cobro', items: TYPE_PAYMENT, size: 12,
      })}
      <br />
      {Array.from({ length: 4 }).map(_renderPayment)}
    </ModalGrid>
  );
};

NewInvoiceModal.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  createInvoiceExpense: PropTypes.func.isRequired,
  idProvider: PropTypes.string,
};

NewInvoiceModal.displayName = 'NewInvoiceModal';

export default memo(NewInvoiceModal);
