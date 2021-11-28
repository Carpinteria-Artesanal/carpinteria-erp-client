import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { ModalGrid } from 'components/Modals';
import { DatePickerForm, InputForm, SelectForm } from 'components/Forms';
import { TYPE_PAYMENT } from 'constants/invoices';
import { format } from 'utils';

const ConfirmPaymentModal = ({
  confirmPayment,
  close,
  ...rest
}) => {
  const [paymentDate, setPaymentDate] = useState(null);
  const [type, setType] = useState('?');
  const [numCheque, setNumCheque] = useState(null);
  const [amount, setAmount] = useState(null);

  const _handleSend = () => {
    confirmPayment({
      paymentDate: format.dateToSend(paymentDate),
      type,
      ...(numCheque && { numCheque }),
      amount,
    }, close);
  };

  /**
   * Handle change picker
   * @param {String} date
   * @private
   */
  const _handleChangePicker = date => {
    setPaymentDate((date));
  };

  /**
   * Handle change select
   * @param {String} string
   * @private
   */
  const _handleSelect = ({ target: { value } }) => {
    setType(value);
  };

  /**
   * Handle change number of cheque
   * @param {String} value
   * @private
   */
  const _handleCheque = ({ target: { value } }) => {
    setNumCheque(value);
  };

  /**
   * Handle change number of cheque
   * @param {String} value
   * @private
   */
  const _handleAmount = ({ target: { value } }) => {
    setAmount(value);
  };

  /**
   * Handle press enter key
   * @param {string} key
   * @private
   */
  const _handleKeyPress = ({ key }) => {
    if (key === 'Enter') _handleSend();
  };

  /**
   * Render input of number cheque
   * @returns {InputForm|null}
   * @private
   */
  const _renderNumberCheque = () => (
    type === 'Talón'
      ? (
        <InputForm
          label='Número de talón'
          value={numCheque}
          onChange={_handleCheque}
          onKeyPress={_handleKeyPress}
          size={4}
        />
      )
      : null
  );

  return (
    <ModalGrid
      {...rest}
      title='Confirmación de factura'
      action={_handleSend}
      close={close}
    >
      <DatePickerForm
        clearable
        size={4}
        label='Fecha de cobro'
        value={paymentDate}
        onAccept={_handleChangePicker}
      />

      <SelectForm
        label='Tipo de cobro'
        value={type}
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
      {_renderNumberCheque()}
      <InputForm
        label='Importe'
        value={numCheque}
        onChange={_handleAmount}
        onKeyPress={_handleKeyPress}
        size={4}
      />
    </ModalGrid>
  );
};

ConfirmPaymentModal.propTypes = {
  close: PropTypes.func.isRequired,
  confirmPayment: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

ConfirmPaymentModal.displayName = 'ConfirmPaymentModal';
export const story = ConfirmPaymentModal;
export default memo(ConfirmPaymentModal);
