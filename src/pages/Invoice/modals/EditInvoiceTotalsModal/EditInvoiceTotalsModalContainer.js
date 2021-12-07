import { connect } from 'react-redux';

import { updateDataInvoice } from 'pages/Invoice/modules/actions';
import { EditTotalsModal } from 'components';

const mapStateToProps = ({ document: { totals, id } }) => ({
  ...totals,
  id,
});

const mapDispatchToProps = {
  update: updateDataInvoice,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditTotalsModal);
