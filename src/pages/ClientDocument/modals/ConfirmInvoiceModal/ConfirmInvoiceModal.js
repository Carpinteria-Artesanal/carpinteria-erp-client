import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { ConfirmModal } from 'components/Modals';

const ConfirmInvoiceModal = ({
  confirmClientDocument,
  id,
  setShow,
  type,
  ...rest
}) => {
  const _close = useCallback(() => {
    setShow(false);
  }, [setShow]);

  const _handleSend = () => {
    confirmClientDocument({
      id,
      callback: _close,
      type,
    });
    _close();
  };

  return (
    <ConfirmModal
      {...rest}
      close={_close}
      title='Confirmar factura'
      description='Al confirmar, se asignará un número de factura'
      action={_handleSend}
      actions={[
        {
          onClick: _close,
          value: 'Cerrar',
        },
        {
          color: 'primary',
          onClick: _handleSend,
          variant: 'contained',
          value: 'Confirmar',
        },
      ]}
    />
  );
};

ConfirmInvoiceModal.propTypes = {
  setShow: PropTypes.func,
  id: PropTypes.string.isRequired,
  confirmClientDocument: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

ConfirmInvoiceModal.displayName = 'ConfirmInvoiceModal';
export const story = ConfirmInvoiceModal;
export default memo(ConfirmInvoiceModal);
