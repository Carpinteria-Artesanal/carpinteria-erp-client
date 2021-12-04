/* eslint-disable react-hooks/exhaustive-deps */
import {
  memo, useCallback, useEffect, useReducer,
} from 'react';
import { Container } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';

import { Page, SearchWithoutState } from 'components';
import { INVOICE_TYPE } from 'constants/invoices';
import Header from './Header';
import { useStyles } from './ClientBook.styles';
import InvoicesTable from './InvoicesTable';
import { DATE_FIELDS, FIELDS, INITIAL_STATE } from '../constans';
import { format } from '../../../utils';

const ClientBook = ({
  invoices,
  getClientInvoices,
}) => {
  const classes = useStyles();
  const {
    type,
    year,
  } = useParams();
  const [filters, setFilters] = useReducer(
    (oldstate, newState) => ({ ...oldstate, ...newState }),
    INITIAL_STATE,
  );

  useEffect(() => {
    setFilters(INITIAL_STATE);
    getClientInvoices({
      type,
      year,
    });
  }, [type]);

  const _getData = useCallback((pagination = {}) => {
    const {
      total,
      from,
      to,
      nInvoice,
    } = filters;
    getClientInvoices({
      type,
      year,
      ...(from && { from: format.dateToSend(from) }),
      ...(to && { to: format.dateToSend(to) }),
      ...(total && { total }),
      ...(nInvoice && { nInvoice }),
      ...pagination,
    });
  }, [filters]);

  return (
    <Page className={classes.root} title='Libro'>
      <Container maxWidth={false}>
        <Header year={Number(year)} type={type} />
        {type === INVOICE_TYPE && (
          <SearchWithoutState
            dates={DATE_FIELDS}
            fields={FIELDS}
            state={filters}
            get={_getData}
            setState={setFilters}
          />
        )}
        <InvoicesTable invoices={invoices} />
      </Container>
    </Page>
  );
};
ClientBook.propTypes = {
  invoices: PropTypes.array.isRequired,
  getClientInvoices: PropTypes.func.isRequired,
};

ClientBook.displayName = 'ClientBook';
export const story = ClientBook;
export default memo(ClientBook);
