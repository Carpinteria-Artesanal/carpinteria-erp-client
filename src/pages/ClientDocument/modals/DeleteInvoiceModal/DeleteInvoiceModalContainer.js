import { connect } from 'react-redux';

import DeleteInvoiceModal from './DeleteInvoiceModal';
import { deleteClientDocument } from '../../modules/actions';

const mapStateToProps = ({ document: { _id, client } }) => ({
  id: _id,
  client,
});

const mapDispatchToProps = {
  deleteClientDocument,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteInvoiceModal);
