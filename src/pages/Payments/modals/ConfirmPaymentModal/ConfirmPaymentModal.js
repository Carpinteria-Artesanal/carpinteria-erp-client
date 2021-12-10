import PropTypes from 'prop-types';

import { ConfirmModal } from 'components';

const ConfirmPaymentModal = ({
  confirmPayment, close, payment,
}) => {
  // eslint-disable-next-line no-console
  console.log(payment);
  /**
   * Send email to the client for change password
   * @private
   */
  const _handleSend = () => {
    confirmPayment({
      id: payment.id, invoice: payment.invoiceId, callback: close,
    });
  };

  return (
    <ConfirmModal
      show={Boolean(payment)}
      close={close}
      title='Aplicar pago'
      description='¿Seguro que marcar este pago como pagado?'
      action={_handleSend}
      actions={[
        {
          onClick: close,
          value: 'Cerrar',
        },
        {
          onClick: _handleSend,
          color: 'secondary',
          variant: 'contained',
          value: 'Pagar',
        },
      ]}
    />
  );
};

ConfirmPaymentModal.propTypes = {
  close: PropTypes.func.isRequired,
  confirmPayment: PropTypes.func.isRequired,
  payment: PropTypes.object,
};

ConfirmPaymentModal.displayName = 'ConfirmPaymentModal';
export default ConfirmPaymentModal;
