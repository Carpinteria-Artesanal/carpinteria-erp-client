/* eslint-disable react/prop-types */
import { memo } from 'react';
import PropTypes from 'prop-types';

import { BooleanIcon, TableMaterial, TextEuro } from 'components';
import { format } from 'utils';
import { useStyles } from './InvoicePayments.styles';

const InvoicePayments = ({
  payments,
}) => {
  const classes = useStyles();
  const _rowStyle = ({ paid }) => (paid ? '' : classes.rowRed);

  return (
    <TableMaterial
      className={classes.root}
      columns={[
        {
          title: 'Fecha',
          render: ({ paymentDate }) => format.date(paymentDate),
        },
        {
          title: 'Cantidad',
          render: ({ amount }) => <TextEuro num={amount} />,
        },
        {
          title: 'Pagado',
          render: ({ paid }) => <BooleanIcon value={paid} />,
        },
      ]}
      data={payments}
      title='Pagos'
      rowClass={_rowStyle}
    />
  );
};

InvoicePayments.propTypes = {
  payments: PropTypes.array.isRequired,
};

InvoicePayments.displayName = 'InvoicePayments';
export const story = InvoicePayments;
export default memo(InvoicePayments);
