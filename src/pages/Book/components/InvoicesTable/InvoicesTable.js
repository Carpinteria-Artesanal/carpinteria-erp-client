import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';

import { TableMaterial, TextEuro } from 'components';
import { BASE_PATH } from 'constants/index';
import { format } from 'utils';
import { useStyles } from './InvoicesTable.styles';

const InvoicesTable = ({
  invoices,
  count,
  getInvoices,
}) => {
  const classes = useStyles();

  const _rowStyle = ({ paid }) => (paid ? '' : classes.rowRed);

  return (
    <TableMaterial
      className={classes.table}
      columns={[
        {
          title: 'Nº de Orden',
          field: 'nOrder',
        },
        {
          title: 'Fecha de registro',
          render: ({ dateRegister }) => format.date(dateRegister),
        },
        {
          title: 'Fecha de factura',
          render: ({ dateInvoice }) => format.date(dateInvoice),
        },
        {
          title: 'Nº de Factura',
          field: 'nInvoice',
        },
        {
          title: 'Concepto',
          field: 'concept',
        },
        {
          title: 'Proveedor',
          field: 'businessName',
        },
        {
          title: 'Importe',
          // eslint-disable-next-line react/prop-types
          render: ({ total }) => <TextEuro num={total} />,
        },
      ]}
      data={invoices}
      actions={[
        {
          icon: VisibilityIcon,
          tooltip: 'Ver',
          component: Link,
          to: ({ _id }) => `${BASE_PATH}/facturas/${_id}`,
        },
      ]}
      rowClass={_rowStyle}
      count={count}
      refresh={getInvoices}
      rowsPerPageOptions={[100, 250, 500]}
    />
  );
};

InvoicesTable.propTypes = {
  invoices: PropTypes.array.isRequired,
  count: PropTypes.number,
  getInvoices: PropTypes.func.isRequired,
};

InvoicesTable.displayName = 'BillingTable';

export default InvoicesTable;
