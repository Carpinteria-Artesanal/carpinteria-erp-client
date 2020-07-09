import React from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@material-ui/core';
import uniqueId from 'uniqid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ProductsOrderTable from './ProductsOrderTable';
import DeliveryOrderExpandHeader from './DeliveryOrderExpandHeader';

const DeliveryOrderExpand = ({ products, ...props }) => (
  <Accordion TransitionProps={{ unmountOnExit: true }} key={uniqueId()}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-label="Expand"
    >
      <DeliveryOrderExpandHeader {...props} />
    </AccordionSummary>

    <AccordionDetails>
      <ProductsOrderTable products={products} />
    </AccordionDetails>
  </Accordion>
);

DeliveryOrderExpand.propTypes = {
  products: PropTypes.array.isRequired,
};

DeliveryOrderExpand.displayName = 'DeliveryOrderExpand';
export const story = DeliveryOrderExpand;
export default DeliveryOrderExpand;
