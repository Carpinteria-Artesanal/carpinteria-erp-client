/* eslint-disable react-hooks/exhaustive-deps */
import {
  useEffect,
} from 'react';
import { Container } from '@material-ui/core';
import PropTypes from 'prop-types';

import { Page, SearchForm } from 'components';
import Header from './Header';
import PaymentsTable from './PaymentsTable';
import { useStyles } from './Payments.styles';
import { INITIAL_STATE } from '../../ClientPayments/constants';
import { DATE_FIELDS } from '../constants';

const Payments = ({
  payments,
  getPayments,
}) => {
  const classes = useStyles();

  useEffect(() => {
    getPayments();
  }, [getPayments]);
  return (
    <Page className={classes.root} title='Pagos'>
      <Container maxWidth={false}>
        <Header />
        <SearchForm
          initialState={INITIAL_STATE}
          fields={[]}
          dates={DATE_FIELDS}
          get={getPayments}
        />
        <PaymentsTable payments={payments} />
      </Container>
    </Page>
  );
};
Payments.propTypes = {
  payments: PropTypes.array.isRequired,
  getPayments: PropTypes.func.isRequired,
};

Payments.displayName = 'Payments';
export default Payments;
