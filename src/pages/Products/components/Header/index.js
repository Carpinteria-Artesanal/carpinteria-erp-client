import { memo, useCallback, useState } from 'react';
import { Header } from 'components';
import AddIcon from '@material-ui/icons/Add';
import NewProductModal from '../../modals/NewProductModal';

const HeaderProductsClients = () => {
  const [showModal, setShowModal] = useState(false);

  const _close = useCallback(() => {
    setShowModal(false);
  }, [setShowModal]);

  return (
    <>
      <Header
        title='Productos'
        description='Productos'
        routes={[{
          link: '/app/clientes',
          title: 'Clientes',
        }]}
        buttons={[{
          variant: 'contained',
          onClick: () => setShowModal(true),
          Icon: AddIcon,
          disableSvg: true,
          label: 'Nuevo producto',
        }]}
      />
      <NewProductModal show={showModal} close={_close} />
    </>
  );
};

HeaderProductsClients.displayName = 'HeaderProductsClients';
export const story = HeaderProductsClients;
export default memo(HeaderProductsClients);
