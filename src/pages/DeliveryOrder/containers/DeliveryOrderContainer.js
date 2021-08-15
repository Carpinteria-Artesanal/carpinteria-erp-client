import { connect } from 'react-redux';
import DeliveryOrder from '../components/DeliveryOrder';
import {
  createDeliveryOrder,
  deleteDOClientInvoice,
  deleteProduct,
  getDeliveryOrder,
  resetClientInvoiceState,
  updateDataClientInvoice,
  updateDOClientInvoice,
} from '../modules/actions';
import { getProducts } from '../../Products/modules/actions';

const mapStateToProps = ({ deliveryOrder }) => deliveryOrder;

const mapDispatchToProps = {
  getDeliveryOrder,
  resetClientInvoiceState,
  updateDataClientInvoice,
  createDeliveryOrder,
  updateDOClientInvoice,
  deleteDOClientInvoice,
  getProducts,
  deleteProduct,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeliveryOrder);
