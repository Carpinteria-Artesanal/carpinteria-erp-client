import { connect } from 'react-redux';

import ConfirmPaymentModal from './ConfirmPaymentModal';
import { addClientPayment } from '../../modules/actions';

const mapDispatchToProps = {
  addClientPayment,
};

export default connect(
  null,
  mapDispatchToProps,
)(ConfirmPaymentModal);
