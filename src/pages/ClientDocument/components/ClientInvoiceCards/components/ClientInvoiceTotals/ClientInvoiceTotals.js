import { useState, memo } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import uniqId from 'uniqid';

import { ItemCard } from 'components';
import { itemsCard } from './utils';
import EditClientInvoiceTotalsModal from '../../../../modals/EditClientInvoiceTotalsModal';

const ClientInvoiceTotals = ({ type, ...props }) => {
  const [showModal, setShowModal] = useState(false);

  /**
   * Show the modal
   * @private
   */
  const _handleEditClick = () => {
    setShowModal(true);
  };

  /**
   * Return the buttons of the card
   * @returns {Array}
   * @private
   */
  const _getActions = () => [
    <Tooltip title='Editar' key={uniqId()}>
      <IconButton
        size='small'
        onClick={_handleEditClick}
      >
        <EditIcon />
      </IconButton>
    </Tooltip>,
  ];

  return (
    <>
      <Card>
        <CardHeader title='Totales' action={_getActions()} />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            {itemsCard(props)
              .map(itemProps => (
                <Grid item xs={12} md={4} key={uniqId()}>
                  <ItemCard {...itemProps} />
                </Grid>
              ))}

          </Grid>
        </CardContent>
      </Card>
      <EditClientInvoiceTotalsModal show={showModal} setShow={setShowModal} type={type} />
    </>
  );
};

ClientInvoiceTotals.propTypes = {
  total: PropTypes.number,
  taxBase: PropTypes.number,
  iva: PropTypes.number,
  type: PropTypes.string.isRequired,
};

ClientInvoiceTotals.displayName = 'ClientInvoiceTotals';
export const story = ClientInvoiceTotals;
export default memo(ClientInvoiceTotals);
