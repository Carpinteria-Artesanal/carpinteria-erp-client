import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardContent, CardHeader, Divider, Grid, IconButton, Tooltip,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import uniqId from 'uniqid';

import ProductItemCard from './ProductItemCard';
import { generateLabels } from './utils';

const ProductData = ({
  product, className,
}) => {
  const [showModal, setShowModal] = useState(false);

  console.log(product);
  /**
   * Show the modal
   * @private
   */
  const _handleEditClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <Card className={className}>
        <CardHeader
          title='Totales'
          action={[
            <Tooltip title='Editar' key={uniqId()}>
              <IconButton
                size='small'
                onClick={_handleEditClick}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>,
          ]}
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            {generateLabels(product)
              .map(item => <ProductItemCard {...item} />)}
          </Grid>
        </CardContent>
      </Card>
      {/* <EditInvoiceTotalsModal show={showModal} setShow={setShowModal} /> */}
    </>
  );
};

ProductData.propTypes = {
  product: PropTypes.object.isRequired,
  className: PropTypes.string,
};

ProductData.displayName = 'InvoiceTotals';
export const story = ProductData;
export default memo(ProductData);