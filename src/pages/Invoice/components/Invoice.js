/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { Container } from '@material-ui/core';

import { LoadingScreen, Page } from 'components';
import Header from './Header';
import { useStyles } from './Invoice.styles';
import InvoiceCards from './InvoiceCards';
import InvoicePayments from './InvoicePayments';

const Invoice = ({
  getInvoice,
  id,
  nameProvider,
  provider,
  payments,
  totals,
  data,
  resetInvoiceState,
  paymentType,
  paid,
}) => {
  const { idInvoice } = useParams();
  const classes = useStyles();

  useEffect(() => {
    if (idInvoice && idInvoice !== id) getInvoice(idInvoice);
  }, [idInvoice]);

  useEffect(() => () => resetInvoiceState(), []);

  if (!id) return <LoadingScreen />;

  return (
    <Page className={classes.root} title={`${nameProvider} | Factura`}>
      <Container maxWidth={false}>
        <Header
          provider={provider}
          nameProvider={nameProvider}
          nOrder={data.nOrder}
        />

        <InvoiceCards totals={totals} data={data} paymentType={paymentType} paid={paid} id={id} />
        <InvoicePayments payments={payments} paymentType={paymentType} paid={paid} />

      </Container>
    </Page>
  );
};

Invoice.propTypes = {
  getInvoice: PropTypes.func.isRequired,
  payments: PropTypes.array,
  id: PropTypes.string,
  nameProvider: PropTypes.string,
  provider: PropTypes.string,
  totals: PropTypes.object,
  data: PropTypes.object,
  paymentType: PropTypes.string.isRequired,
  paid: PropTypes.bool,
  resetInvoiceState: PropTypes.func.isRequired,
};

Invoice.displayName = 'Invoice';
export const story = Invoice;
export default memo(Invoice);
