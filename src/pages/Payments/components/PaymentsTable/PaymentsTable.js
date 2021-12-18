import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import EuroIcon from '@material-ui/icons/Euro';

import { TableMaterial, TextEuro } from 'components';
import { format } from 'utils';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Link } from 'react-router-dom';
import ConfirmPaymentModal from '../../modals/ConfirmPaymentModal';
import { useStyles } from './PaymentsTable.styles';
import { BASE_PATH } from '../../../../constants';

const PaymentsTable = ({
  payments, sum,
}) => {
  const classes = useStyles();
  const [payment, setPayment] = useState(null);

  const _handlePaymentButton = row => {
    setPayment(row);
  };

  const _closeModal = () => {
    setPayment(null);
  };

  return (
    <>
      <TableMaterial
        className={classes.table}
        columns={[
          {
            title: 'Nº de Orden',
            field: 'nOrder',
          },
          {
            title: 'Fecha de factura',
            render: ({ invoiceDate }) => format.date(invoiceDate),
          },
          {
            title: 'Nº de Factura',
            field: 'nInvoice',
          },
          {
            title: 'Proveedor',
            field: 'provider',
          },
          {
            title: 'Tipo',
            field: 'type',
          },
          {
            title: 'Importe',
            // eslint-disable-next-line react/prop-types
            render: ({ amount }) => <TextEuro num={amount} />,
          },
          {
            title: 'Fecha de cobro',
            render: ({ paymentDate }) => format.date(paymentDate),
          },
        ]}
        data={payments}
        actions={[
          {
            icon: EuroIcon,
            tooltip: 'Pagar',
            onClick: _handlePaymentButton,
          },
          {
            icon: VisibilityIcon,
            tooltip: 'Ver',
            component: Link,
            to: ({ invoiceId }) => `${BASE_PATH}/facturas/${invoiceId}`,
          },
        ]}
        title={sum && `Total: ${format.euro(sum)}`}
      />
      <ConfirmPaymentModal payment={payment} close={_closeModal} />
    </>
  );
};

PaymentsTable.propTypes = {
  payments: PropTypes.array.isRequired,
  sum: PropTypes.number,
};

PaymentsTable.displayName = 'PaymentsTable';

export default memo(PaymentsTable);
