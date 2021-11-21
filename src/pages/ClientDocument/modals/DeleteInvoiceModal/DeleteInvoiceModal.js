import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { ConfirmModal } from 'components';
import { useHistory } from 'react-router';

const DeleteInvoiceModal = ({
  deleteClientDocument,
  id,
  setShow,
  client,
  type,
  ...rest
}) => {
  const history = useHistory();
  const _close = useCallback(() => {
    setShow(false);
  }, [setShow]);

  const _handleSend = () => {
    deleteClientDocument({
      id,
      callback: () => {
        history.replace(`/app/clientes/${client}`);
      },
      type,
    });
    _close();
  };

  return (
    <ConfirmModal
      {...rest}
      close={_close}
      title='Eliminar producto'
      description='¿Seguro que quieres eliminar este producto?'
      action={_handleSend}
      actions={[
        {
          variant: 'contained',
          color: 'primary',
          onClick: _close,
          value: 'Cerrar',
        },
        {
          onClick: _handleSend,
          variant: 'contained',
          value: 'Eliminar',
        },
      ]}
    />
  );
};

DeleteInvoiceModal.propTypes = {
  setShow: PropTypes.func,
  id: PropTypes.string,
  deleteClientDocument: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  client: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

DeleteInvoiceModal.displayName = 'DeleteProductModal';
export const story = DeleteInvoiceModal;
export default memo(DeleteInvoiceModal);
