/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect } from 'react';
import { Container } from '@material-ui/core';
import PropTypes from 'prop-types';

import { Page } from 'components';
import Header from './Header';
import { useStyles } from './ClientPayments.styles';
import InvoicesTable from './InvoicesTable';

const ClientPayments = ({
  invoices,
  getClientPayments,
}) => {
  const classes = useStyles();

  useEffect(() => {
    getClientPayments();
  }, []);

  return (
    <Page className={classes.root} title='Pagos de clientes'>
      <Container maxWidth={false}>
        <Header />
        <InvoicesTable invoices={invoices} />
      </Container>
    </Page>
  );
};
ClientPayments.propTypes = {
  invoices: PropTypes.array.isRequired,
  getClientPayments: PropTypes.func.isRequired,
};

ClientPayments.displayName = 'ClientBook';
export const story = ClientPayments;
export default memo(ClientPayments);
