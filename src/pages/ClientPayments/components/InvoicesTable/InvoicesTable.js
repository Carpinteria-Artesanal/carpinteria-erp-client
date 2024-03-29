import { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';

import { TableMaterial, TextEuro } from 'components';
import { BASE_PATH } from 'constants/index';
import { format } from 'utils';
import EuroIcon from '@material-ui/icons/Euro';
import { useStyles } from './InvoicesTable.styles';
import ConfirmPaymentModal from '../../modals/ConfirmPaymentModal';

const InvoicesTable = ({ invoices, getClientPayments, count }) => {
  const classes = useStyles();
  const [payment, setPayment] = useState(null);

  const _handlePaymentButton = row => {
    setPayment(row);
  };

  const _closeModal = useCallback(
    () => {
      setPayment(null);
    },
    [],
  );

  return (
    <>
      <TableMaterial
        className={classes.table}
        columns={[
          {
            title: 'Nº',
            field: 'nInvoice',
          },
          {
            title: 'Fecha',
            render: ({ date }) => format.date(date),
          },
          {
            title: 'Cliente',
            field: 'nameClient',
          },
          {
            title: 'Importe',
            // eslint-disable-next-line react/prop-types
            render: ({ total }) => <TextEuro num={total} />,
          },
          {
            title: 'Pendiente',
            // eslint-disable-next-line react/prop-types
            render: ({ remaining }) => <TextEuro num={remaining} red />,
          },
        ]}
        data={invoices}
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
            to: ({ _id }) => `${BASE_PATH}/clientes/facturas/${_id}`,
          },
        ]}
        refresh={getClientPayments}
        count={count}
      />
      <ConfirmPaymentModal payment={payment} close={_closeModal} />
    </>
  );
};

InvoicesTable.propTypes = {
  invoices: PropTypes.array.isRequired,
  getClientPayments: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
};

InvoicesTable.displayName = 'PaymentsTable';

export default memo(InvoicesTable);
