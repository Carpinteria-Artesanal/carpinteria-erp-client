import { useCallback, useState } from 'react';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import PropTypes from 'prop-types';
import GetAppIcon from '@material-ui/icons/GetApp';
import { PlusCircle as PlusCircleIcon, Trash2 } from 'react-feather';

import { Header } from 'components';
import { downloadFile } from 'utils';
import { TYPES, TYPES_HASH, TYPES_HEADER } from '../../constants';
import ConfirmInvoiceModal from '../../modals/ConfirmInvoiceModal';
import DeleteInvoiceModal from '../../modals/DeleteInvoiceModal';
import ProductOrderModal from '../../modals/ProductOrderModal/ProductOrderModalContainer';

const HeaderClientInvoice = ({
  client,
  nameClient,
  nInvoice,
  id,
  type,
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);

  const typeName = TYPES_HEADER[type];

  const _handleClickDownload = () => () => downloadFile(
    `${TYPES[type]}/export/${id}`,
    `${typeName} ${nInvoice} - ${nameClient}.ods`,
  );

  const _handleClickNewProduct = () => {
    setShowAddProduct(true);
  };

  const _closeNewProduct = useCallback(() => {
    setShowAddProduct(false);
  }, []);

  return (
    <>
      <Header
        routes={[{
          link: '/app/clientes',
          title: 'Clientes',
        }, {
          link: `/app/clientes/${client}#${TYPES_HASH[type]}`,
          title: `${nameClient}`,
        },
        ]}
        title={typeName}
        description=''
        buttons={[
          {
            onClick: _handleClickDownload(),
            color: 'primary',
            Icon: GetAppIcon,
            label: 'Descargar',
            variant: 'contained',
          }, {
            variant: 'outlined',
            color: 'default',
            onClick: () => setShowDeleteModal(true),
            Icon: Trash2,
            label: 'Eliminar',
          }, {
            variant: 'contained',
            color: 'secondary',
            onClick: () => setShowConfirmModal(true),
            Icon: CheckCircleOutlinedIcon,
            disableSvg: true,
            label: 'Confirmar',
            disabled: Boolean(nInvoice),
          }, {
            variant: 'contained',
            color: 'primary',
            onClick: _handleClickNewProduct,
            Icon: PlusCircleIcon,
            disableSvg: true,
            label: 'Nuevo producto',
          }]}
      />
      <ConfirmInvoiceModal show={showConfirmModal} setShow={setShowConfirmModal} type={type} />
      <DeleteInvoiceModal show={showDeleteModal} setShow={setShowDeleteModal} type={type} />
      <ProductOrderModal
        invoice={id}
        show={showAddProduct}
        close={_closeNewProduct}
        type={type}
      />
    </>
  );
};

HeaderClientInvoice.propTypes = {
  nameClient: PropTypes.string.isRequired,
  client: PropTypes.string.isRequired,
  nInvoice: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
};

HeaderClientInvoice.displayName = 'HeaderClientInvoice';

export default HeaderClientInvoice;
