/* eslint-disable react-hooks/exhaustive-deps */
import {
  memo, useCallback, useEffect, useReducer,
} from 'react';
import { Container } from '@material-ui/core';
import PropTypes from 'prop-types';

import { Page, SearchWithoutState } from 'components';

import Header from './Header';
import { useStyles } from './ClientPayments.styles';
import InvoicesTable from './InvoicesTable';
import { format } from '../../../utils';
import { DATE_FIELDS, INITIAL_STATE } from '../constants';

const ClientPayments = ({
  invoices,
  getClientPayments,
  count,
}) => {
  const classes = useStyles();

  const [filters, setFilters] = useReducer(
    (oldstate, newState) => ({ ...oldstate, ...newState }),
    INITIAL_STATE,
  );

  const _getData = useCallback((pagination = {}) => {
    const {
      from,
      to,
    } = filters;
    getClientPayments({
      ...(from && { from: format.dateToSend(from) }),
      ...(to && { to: format.dateToSend(to) }),
      ...pagination,
    });
  }, [filters]);

  useEffect(() => {
    setFilters(INITIAL_STATE);
    _getData();
  }, []);

  return (
    <Page className={classes.root} title='Pagos de clientes'>
      <Container maxWidth={false}>
        <Header />
        <SearchWithoutState
          dates={DATE_FIELDS}
          fields={[]}
          state={filters}
          get={_getData}
          setState={setFilters}
        />
        <InvoicesTable invoices={invoices} getClientPayments={getClientPayments} count={count} />
      </Container>
    </Page>
  );
};
ClientPayments.propTypes = {
  invoices: PropTypes.array.isRequired,
  getClientPayments: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
};

ClientPayments.displayName = 'ClientBook';
export const story = ClientPayments;
export default memo(ClientPayments);
