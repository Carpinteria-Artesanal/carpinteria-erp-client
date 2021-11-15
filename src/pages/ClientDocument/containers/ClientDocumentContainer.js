import { connect } from 'react-redux';
import { getProducts } from 'pages/Products/modules/actions';
import ClientDocument from '../components/ClientDocument';
import {
  createClientDocument,
  deleteClientDocument,
  deleteProduct,
  getClientDocument,
  resetClientDocumentState,
  updateDataClientDocument,
  updateClientDocument,
} from '../modules/actions';

const mapStateToProps = ({ document }) => document;

const mapDispatchToProps = {
  getClientDocument,
  resetClientDocumentState,
  updateDataClientDocument,
  createClientDocument,
  updateClientDocument,
  deleteClientDocument,
  getProducts,
  deleteProduct,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClientDocument);
