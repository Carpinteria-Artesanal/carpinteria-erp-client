import { connect } from 'react-redux';

import ConfirmInvoiceModal from './ConfirmInvoiceModal';
import { confirmClientDocument } from '../../modules/actions';

const mapStateToProps = ({ document: { _id } }) => ({
  id: _id,
});

const mapDispatchToProps = {
  confirmClientDocument,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmInvoiceModal);
