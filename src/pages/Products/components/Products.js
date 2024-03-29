/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect } from 'react';
import { Container } from '@material-ui/core';
import PropTypes from 'prop-types';

import { Page } from 'components';
import Header from './Header';
import ProductsTable from './ProductsTable';
import { useStyles } from './Products.styles';

const Products = ({
  products,
  getProducts,
}) => {
  const classes = useStyles();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <Page className={classes.root} title='Productos'>
      <Container maxWidth={false}>
        <Header />
        <ProductsTable products={products} />
      </Container>
    </Page>
  );
};
Products.propTypes = {
  products: PropTypes.array.isRequired,
  getProducts: PropTypes.func.isRequired,
};

Products.displayName = 'Products';
export const story = Products;
export default memo(Products);
