/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable */
import { memo, useEffect } from 'react';
import { Container } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';

import { Page } from 'components';
import Header from './Header';
import { useStyles } from './ClientBook.styles';
import InvoicesTable from './InvoicesTable';
import SearchForm from '../../Book/components/SearchForm/SearchForm';

const ClientBook = ({
  invoices,
  getClientInvoices,
}) => {
  const classes = useStyles();
  const {
    type,
    year,
  } = useParams();

  useEffect(() => {
    getClientInvoices(type, year);
  }, [type, year]);

  return (
    <Page className={classes.root} title='Libro'>
      <Container maxWidth={false}>
        <Header year={Number(year)} type={type} />
        <SearchForm
          getInvoices={() => {
          }}
          year={year}
          state={{}}
          setState={() => alert('Todavia no funciona')}
        />
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
