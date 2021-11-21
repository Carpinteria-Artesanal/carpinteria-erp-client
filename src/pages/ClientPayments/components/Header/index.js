import { memo } from 'react';

import { Header } from 'components';

const HeaderClientPayments = () => (
  <Header
    title='Pagos'
    description='Pagos de clientes'
    routes={[{
      link: '/app/clientes/listado',
      title: 'Clientes',
    }]}
  />
);

HeaderClientPayments.displayName = 'HeaderClientPayments';
export default memo(HeaderClientPayments);
