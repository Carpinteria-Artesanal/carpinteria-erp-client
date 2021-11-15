import { connect } from 'react-redux';

import DeleteInvoiceModal from './DeleteInvoiceModal';
import { deleteClientDocument } from '../../modules/actions';

const mapStateToProps = ({ clientInvoice: { _id, client } }) => ({
  id: _id,
  client,
});

const mapDispatchToProps = {
  deleteClientInvoice: deleteClientDocument,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteInvoiceModal);
