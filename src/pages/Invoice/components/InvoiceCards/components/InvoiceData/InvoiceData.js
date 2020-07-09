import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardContent, CardHeader, Divider, Grid, IconButton, Tooltip,
} from '@material-ui/core';

import { ItemCard } from 'components';
import uniqId from 'uniqid';
import EditIcon from '@material-ui/icons/Edit';
import { format } from 'utils';
import EditInvoiceDataModal from 'pages/Invoice/modals/EditInvoiceDataModal';

const InvoiceData = ({
  dateRegister, dateInvoice, nInvoice, nOrder,
}) => {
  const [showModal, setShowModal] = useState(false);

  const _handleEditClick = () => {
    setShowModal(true);
  };

  /**
   * Return the buttons of the card
   * @returns {Array || false}
   * @private
   */
  const _getActions = () => (!nOrder ? [
    <Tooltip title="Editar" key={uniqId()}>
      <IconButton
        size="small"
        onClick={_handleEditClick}
      >
        <EditIcon />
      </IconButton>
    </Tooltip>,
  ] : false);

  return (
    <>
      <Card>
        <CardHeader
          title="Datos de la factura"
          action={_getActions()}
        />
        <Divider />
        <CardContent>
          <Grid spacing={3} container>
            <Grid item xs={12} md={6}>
              <ItemCard label="Nº Orden" value={nOrder} />
            </Grid>
            <Grid item xs={12} md={6}>
              <ItemCard label="Nº Factura" value={nInvoice} />
            </Grid>
            <Grid item xs={12} md={6}>
              <ItemCard label="Fecha de registro" value={format.date(dateRegister)} />
            </Grid>
            <Grid item xs={12} md={6}>
              <ItemCard label="Fecha de factura" value={format.date(dateInvoice)} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <EditInvoiceDataModal show={showModal} setShow={setShowModal} />
    </>
  );
};

InvoiceData.propTypes = {
  dateRegister: PropTypes.number,
  dateInvoice: PropTypes.number,
  nInvoice: PropTypes.string,
  nOrder: PropTypes.number,
};

InvoiceData.displayName = 'InvoiceData';
export const story = InvoiceData;
export default memo(InvoiceData);
