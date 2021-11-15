/* eslint-disable react-hooks/exhaustive-deps */
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

import { useStyles } from './ClientInvoiceCards.styles';
import ClientInvoiceData from './components/ClientInvoiceData';
import ClientInvoiceTotals from './components/ClientInvoiceTotals';

const ClientInvoiceCards = ({
  date,
  total,
  taxBase,
  iva,
  id,
  nInvoice,
  updateDataClientInvoice,
  type,
}) => {
  const classes = useStyles();

  return (
    <Grid container spacing={3} className={classes.cards}>
      <Grid item xs={12} md={5}>
        <ClientInvoiceData
          date={date}
          nInvoice={nInvoice}
          updateData={updateDataClientInvoice}
          id={id}
          type={type}
        />
      </Grid>
      <Grid item xs={12} md={7}>
        <ClientInvoiceTotals
          total={total}
          taxBase={taxBase}
          iva={iva}
          type={type}
        />
      </Grid>
    </Grid>
  );
};

ClientInvoiceCards.propTypes = {
  total: PropTypes.number,
  taxBase: PropTypes.number,
  iva: PropTypes.number,
  date: PropTypes.number,
  nInvoice: PropTypes.string,
  id: PropTypes.string.isRequired,
  updateDataClientInvoice: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

ClientInvoiceCards.displayName = 'ClientInvoiceCards';

export default ClientInvoiceCards;
