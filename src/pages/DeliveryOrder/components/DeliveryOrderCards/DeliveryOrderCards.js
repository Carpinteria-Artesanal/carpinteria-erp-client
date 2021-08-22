/* eslint-disable react-hooks/exhaustive-deps */
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

import { useStyles } from './DeliveryOrderCards.styles';
import DeliveryOrderData from './components/DeliveryOrderData';
import DeliveryOrderTotals from './components/DeliveryOrderTotals';

const DeliveryOrderCards = ({
  date,
  total,
  taxBase,
  iva,
  id,
  nInvoice,
  updateDataDeliveryOrder,
}) => {
  const classes = useStyles();

  return (
    <Grid container spacing={3} className={classes.cards}>
      <Grid item xs={12} md={5}>
        <DeliveryOrderData
          date={date}
          nInvoice={nInvoice}
          updateData={updateDataDeliveryOrder}
          id={id}
        />
      </Grid>
      <Grid item xs={12} md={7}>
        <DeliveryOrderTotals
          total={total}
          taxBase={taxBase}
          iva={iva}
        />
      </Grid>
    </Grid>
  );
};

DeliveryOrderCards.propTypes = {
  total: PropTypes.number.isRequired,
  taxBase: PropTypes.number.isRequired,
  iva: PropTypes.number.isRequired,
  date: PropTypes.number,
  nInvoice: PropTypes.string,
  id: PropTypes.string.isRequired,
  updateDataDeliveryOrder: PropTypes.func.isRequired,
};

DeliveryOrderCards.displayName = 'ClientInvoiceCards';

export default DeliveryOrderCards;
