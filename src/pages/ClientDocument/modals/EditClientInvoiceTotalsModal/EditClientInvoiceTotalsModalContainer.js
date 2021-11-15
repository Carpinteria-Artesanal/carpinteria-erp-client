import { connect } from 'react-redux';

import { updateDataClientDocument } from 'pages/ClientDocument/modules/actions';
import { EditTotalsModal } from 'components';

const mapStateToProps = ({ document: { totals, _id } }) => ({
  ...totals,
  id: _id,
});

const mapDispatchToProps = {
  update: updateDataClientDocument,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditTotalsModal);
