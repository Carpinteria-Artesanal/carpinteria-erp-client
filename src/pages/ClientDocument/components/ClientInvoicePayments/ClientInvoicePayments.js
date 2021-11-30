/* eslint-disable react/prop-types */
import { memo } from 'react';
import PropTypes from 'prop-types';

import { TableMaterial, TextEuro } from 'components';
import { format } from 'utils';
import { useStyles } from './ClientInvoicePayments.styles';

const ClientInvoicePayments = ({
  payments,
}) => {
  const classes = useStyles();

  return (
    <TableMaterial
      className={classes.root}
      columns={[
        {
          title: 'Fecha',
          render: ({ date }) => format.date(date),
        },
        {
          title: 'Tipo',
          field: 'paymentType',
        },
        {
          title: 'Cantidad',
          render: ({ amount }) => <TextEuro num={amount} />,
        },
      ]}
      data={payments}
      title='Histórico de pagos'
    />
  );
};

ClientInvoicePayments.propTypes = {
  payments: PropTypes.array.isRequired,
};

ClientInvoicePayments.displayName = 'ClientInvoicePayments';
export const story = ClientInvoicePayments;
export default memo(ClientInvoicePayments);
