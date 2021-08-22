import { connect } from 'react-redux';
import DeliveryOrder from '../components/DeliveryOrder';
import {
  createDeliveryOrder,
  deleteDOClientInvoice,
  deleteProduct,
  getDeliveryOrder,
  resetClientInvoiceState,
  updateDataDeliveryOrder,
  updateDOClientInvoice,
} from '../modules/actions';
import { getProducts } from '../../Products/modules/actions';

const mapStateToProps = ({ deliveryOrder }) => deliveryOrder;

const mapDispatchToProps = {
  getDeliveryOrder,
  resetClientInvoiceState,
  updateDataDeliveryOrder,
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
