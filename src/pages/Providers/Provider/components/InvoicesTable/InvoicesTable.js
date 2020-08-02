import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';

import { TableMaterial } from 'components';
import { BASE_PATH } from 'constants/index';
import { format } from 'utils';
import { useStyles } from './InvoicesTable.styles';

const InvoicesTable = ({ invoices, getInvoicesByProvider, idProvider }) => {
  const classes = useStyles();

  useEffect(() => {
    if (idProvider) getInvoicesByProvider(idProvider);
  }, [getInvoicesByProvider, idProvider]);

  console.log(invoices);

  return idProvider && (
    <TableMaterial
      className={classes.table}
      columns={[
        {
          title: 'Nº de Orden',
          field: 'nOrder',
        },
        {
          title: 'Fecha de factura',
          render: ({ dateInvoice }) => format.date(dateInvoice),
        },
        {
          title: 'Nº de factura',
          field: 'nInvoice',
        },
        {
          title: 'Importe',
          field: 'total',
        },
        {
          title: 'Pago',
          render: ({ payment }) => {
            console.log(payment);
            return (payment?.paid ? payment.type : null);
          },
        },
      ]}
      data={invoices}
      actions={[
        {
          icon: EditIcon,
          tooltip: 'Editar',
          component: Link,
          to: ({ _id }) => `${BASE_PATH}/facturas/${_id}`,
        },
      ]}
    />
  );
};

InvoicesTable.propTypes = {
  invoices: PropTypes.array.isRequired,
  idProvider: PropTypes.string,
  getInvoicesByProvider: PropTypes.func.isRequired,
};

InvoicesTable.displayName = 'InvoicesTable';

export default memo(InvoicesTable);
