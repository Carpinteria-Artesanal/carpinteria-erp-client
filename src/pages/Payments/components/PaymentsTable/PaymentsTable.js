import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import EuroIcon from '@material-ui/icons/Euro';

import { TableMaterial, TextEuro } from 'components';
import { addSelectedToState, format, removeSelectedFromState } from 'utils';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Link } from 'react-router-dom';
import ConfirmPaymentModal from '../../modals/ConfirmPaymentModal';
import DividePaymentModal from '../../modals/DividePaymentModal';
import { useStyles } from './PaymentsTable.styles';
import { BASE_PATH } from '../../../../constants';

const PaymentsTable = ({
  payments,
  selected,
  setSelected,
}) => {
  const classes = useStyles();
  const [payment, setPayment] = useState(null);
  const [dividePayment, setDividePayment] = useState(null);

  /**
   * Toggle checkbox
   * @param {String} id
   * @param {Object} event
   * @private
   */
  const _handleChangeCheckbox = (event, { _id }) => {
    const func = selected.includes(_id) ? removeSelectedFromState : addSelectedToState;
    func(_id, selected, setSelected);
  };

  const _handlePaymentButton = row => {
    setPayment(row);
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
        multiSelect={row => selected.includes(row._id)}
        onSelected={_handleChangeCheckbox}
      />
      <ConfirmPaymentModal payment={payment} setShow={setPayment} />
      <DividePaymentModal paymentId={dividePayment} setShow={setDividePayment} />
    </>
  );
};

PaymentsTable.propTypes = {
  payments: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired,
  setSelected: PropTypes.func.isRequired,
};

PaymentsTable.displayName = 'PaymentsTable';

export default memo(PaymentsTable);
