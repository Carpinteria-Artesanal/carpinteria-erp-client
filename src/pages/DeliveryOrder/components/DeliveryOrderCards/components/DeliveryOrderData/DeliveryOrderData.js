import { memo } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardContent, CardHeader, Divider, Grid,
} from '@material-ui/core';

import { DatePickerForm, ItemCard } from 'components';
import { format } from 'utils';
import { useStyles } from './DeliveryOrderData.styles';

const DeliveryOrderData = ({
  date,
  updateData,
  nInvoice,
  id,
}) => {
  const classes = useStyles();

  const _handleChangeDate = value => {
    updateData(id, { date: format.dateToSend(value) });
  };

  return (
    <Card>
      <CardHeader title='Datos de la factura' />
      <Divider />
      <CardContent>
        <Grid container spacing={3} className={classes.cards}>
          <DatePickerForm
            size={6}
            label='Fecha'
            value={date}
            onChange={_handleChangeDate}
          />
          <Grid item xs={12} md={6}>
            <ItemCard label='Nº Albarán' value={nInvoice} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

DeliveryOrderData.propTypes = {
  date: PropTypes.number,
  nInvoice: PropTypes.string,
  updateData: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

DeliveryOrderData.displayName = 'ClientInvoiceData';
export const story = DeliveryOrderData;
export default memo(DeliveryOrderData);
