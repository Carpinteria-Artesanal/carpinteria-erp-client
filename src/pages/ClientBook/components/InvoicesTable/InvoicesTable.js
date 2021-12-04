import { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';

import { TableMaterial, TextEuro } from 'components';
import { BASE_PATH } from 'constants/index';
import { format } from 'utils';
import { useStyles } from './InvoicesTable.styles';

const InvoicesTable = ({ invoices, getInvoices }) => {
  const classes = useStyles();

  return (
    <TableMaterial
      className={classes.table}
      columns={[
        {
          title: 'Nº',
          field: 'nInvoice',
        },
        {
          title: 'Cliente',
          field: 'nameClient',
        },
        {
          title: 'Fecha',
          render: ({ date }) => format.date(date),
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
          to: ({ _id }) => `${BASE_PATH}/clientes/facturas/${_id}`,
        },
      ]}
      refresh={getInvoices}
    />
  );
};

InvoicesTable.propTypes = {
  invoices: PropTypes.array.isRequired,
  getInvoices: PropTypes.func.isRequired,
};

InvoicesTable.displayName = 'BillingTable';

export default memo(InvoicesTable);
