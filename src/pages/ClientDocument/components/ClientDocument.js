/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from '@material-ui/core';
import PropTypes from 'prop-types';
import {
  memo, useCallback, useEffect, useState,
} from 'react';
import { useParams } from 'react-router';

import {
  LoadingScreen, Page, DeleteProductInvoiceModal, ProductsInvoice,
} from 'components';
import ProductOrderModal from '../modals/ProductOrderModal/ProductOrderModalContainer';
import { useStyles } from './ClientDocument.styles';
import ClientInvoiceCards from './ClientInvoiceCards';
import Header from './Header';

const ClientDocument = ({
  getClientDocument,
  _id,
  nameClient,
  client,
  resetClientDocumentState,
  date,
  total,
  taxBase,
  iva,
  updateDataClientDocument,
  createClientDocument,
  nInvoice,
  getProducts,
  products,
  deleteProduct,
}) => {
  const {
    id,
    type,
  } = useParams();
  const [deleteId, setDeleteId] = useState(undefined);
  const [editId, setEditId] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (id && id !== _id) getClientDocument(type, id);
  }, [id]);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => () => resetClientDocumentState(), []);

  const _closeDeleteModal = useCallback(() => {
    setDeleteId(undefined);
  }, []);

  const showModalDelete = useCallback(product => {
    setDeleteId(product);
  }, []);

  const _closeEditModal = useCallback(() => {
    setEditId(false);
  }, []);

  const showEditModal = useCallback(product => {
    setEditId(product);
  }, []);

  if (!_id) return <LoadingScreen />;

  return (
    <Page className={classes.root} title={`${nameClient} | Factura`}>
      <Container maxWidth={false}>
        <Header
          client={client}
          nameClient={nameClient}
          createDeliveryOrder={createClientDocument}
          id={id}
          nInvoice={nInvoice}
          type={type}
        />

        <ProductsInvoice
          products={products}
          showDeleteProductModal={showModalDelete}
          showEditProductModal={showEditModal}
          type={type}
        />

        <ClientInvoiceCards
          total={total}
          taxBase={taxBase}
          iva={iva}
          date={date}
          id={id}
          updateDataClientInvoice={updateDataClientDocument}
          nInvoice={nInvoice}
          type={type}
        />
      </Container>
      <DeleteProductInvoiceModal
        close={_closeDeleteModal}
        id={_id}
        product={deleteId}
        action={deleteProduct}
      />
      <ProductOrderModal
        invoice={_id}
        show={editId}
        close={_closeEditModal}
        type={type}
      />
    </Page>
  );
};

ClientDocument.propTypes = {
  getClientDocument: PropTypes.func.isRequired,
  _id: PropTypes.string,
  nameClient: PropTypes.string,
  client: PropTypes.string,
  resetClientDocumentState: PropTypes.func.isRequired,
  date: PropTypes.number,
  updateDataClientDocument: PropTypes.func.isRequired,
  createClientDocument: PropTypes.func.isRequired,
  nInvoice: PropTypes.string,
  total: PropTypes.number,
  taxBase: PropTypes.number,
  iva: PropTypes.number,
  getProducts: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  deleteProduct: PropTypes.func.isRequired,
};

ClientDocument.displayName = 'ClientDocument';
export const story = ClientDocument;
export default memo(ClientDocument);
