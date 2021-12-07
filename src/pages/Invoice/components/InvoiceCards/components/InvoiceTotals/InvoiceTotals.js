import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import uniqId from 'uniqid';

import { ItemGroupsCard } from 'components';
import EditInvoiceTotalsModal from 'pages/Invoice/modals/EditInvoiceTotalsModal';

const InvoiceTotals = ({
  total,
  className,
  paymentType,
  paid,
}) => {
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
   * @returns {Array || false}
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
      <Card className={className}>
        <CardHeader
          title='Totales'
          action={_getActions()}
        />
        <Divider />
        <CardContent>
          <ItemGroupsCard
            items={[{
              label: 'TOTAL',
              value: total,
              variant: 'euro',
            }, {
              label: 'Tipo de pago',
              value: paymentType,
            }, {
              label: 'Factura pagada',
              value: paid,
              variant: 'boolean',
            }]}
            groups={3}
          />
        </CardContent>
      </Card>
      <EditInvoiceTotalsModal show={showModal} setShow={setShowModal} onlyTotal />
    </>
  );
};

InvoiceTotals.propTypes = {
  total: PropTypes.number.isRequired,
  className: PropTypes.string.isRequired,
  paymentType: PropTypes.string.isRequired,
  paid: PropTypes.bool,
};

InvoiceTotals.displayName = 'InvoiceTotals';
export const story = InvoiceTotals;
export default memo(InvoiceTotals);
