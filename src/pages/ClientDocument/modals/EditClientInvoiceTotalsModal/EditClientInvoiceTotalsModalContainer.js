import { connect } from 'react-redux';

import { EditTotalsModal } from 'components';
import { updateDataClientDocument } from '../../modules/actions';

const mapStateToProps = ({
  document: {
    total,
    iva,
    taxBase,
    _id,
  },
}) => ({
  id: _id,
  total,
  iva,
  taxBase,
});

const mapDispatchToProps = {
  update: updateDataClientDocument,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditTotalsModal);
