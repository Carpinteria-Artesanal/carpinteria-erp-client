import { memo } from 'react';

import { Header } from 'components';

const HeaderPayments = () => (
  <Header
    title='Pagos'
  />
);

HeaderPayments.displayName = 'HeaderPayments';
export const story = HeaderPayments;
export default memo(HeaderPayments);
