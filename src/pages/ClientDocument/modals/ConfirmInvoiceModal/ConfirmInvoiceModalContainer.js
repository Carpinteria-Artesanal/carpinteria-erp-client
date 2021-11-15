import { connect } from 'react-redux';

import ConfirmInvoiceModal from './ConfirmInvoiceModal';
import { confirmClientDocument } from '../../modules/actions';

const mapStateToProps = ({ clientInvoice: { _id } }) => ({
  id: _id,
});

const mapDispatchToProps = {
  confirmInvoice: confirmClientDocument,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmInvoiceModal);
