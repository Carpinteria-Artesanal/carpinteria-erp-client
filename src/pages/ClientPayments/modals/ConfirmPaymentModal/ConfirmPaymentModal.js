import { memo, useEffect, useState } from 'react';
import {
  Button, Grid,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { ModalGrid } from 'components/Modals';
import { DatePickerForm, InputForm, SelectForm } from 'components/Forms';
import { TYPE_PAYMENT } from 'constants/invoices';
import { format } from 'utils';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../../../reducers/notifications';

const ConfirmPaymentModal = ({
  addClientPayment,
  close,
  payment,
  ...rest
}) => {
  const [paymentDate, setPaymentDate] = useState(null);
  const [type, setType] = useState('?');
  const [amount, setAmount] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (payment) {
      setPaymentDate(null);
      setType('?');
      setAmount(null);
    }
  }, [payment]);

  const _handleSend = () => {
    try {
      const data = {
        date: format.dateToSend(paymentDate),
        paymentType: type,
        amount: Number(amount),
      };
      addClientPayment({
        id: payment._id,
        data,
        callback: close,
      });
    } catch (e) {
      console.error(e);
      dispatch(addNotification({
        level: 'error',
        message: 'El importe no es correcto',
        dismissible: true,
      }));
    }
  };

  const setMaxAmount = () => {
    setAmount(payment.remaining);
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

  return (
    <ModalGrid
      {...rest}
      title='Añadir pago'
      action={_handleSend}
      close={close}
      show={!!payment}
    >
      <DatePickerForm
        clearable
        size={4}
        label='Fecha de pago'
        value={paymentDate}
        onAccept={_handleChangePicker}
      />

      <SelectForm
        label='Forma de pago'
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
      <InputForm
        label='Importe'
        value={amount}
        onChange={_handleAmount}
        onKeyPress={_handleKeyPress}
        size={4}
        type='number'
        InputLabelProps={{ shrink: true }}
      />
      <Grid
        item
        md={6}
        xs={12}
      >
        <Button variant='contained' onClick={setMaxAmount}>Importe Restante</Button>
      </Grid>

    </ModalGrid>
  );
};

ConfirmPaymentModal.propTypes = {
  close: PropTypes.func.isRequired,
  addClientPayment: PropTypes.func.isRequired,
  payment: PropTypes.object,
};

ConfirmPaymentModal.displayName = 'ConfirmPaymentModal';
export const story = ConfirmPaymentModal;
export default memo(ConfirmPaymentModal);
