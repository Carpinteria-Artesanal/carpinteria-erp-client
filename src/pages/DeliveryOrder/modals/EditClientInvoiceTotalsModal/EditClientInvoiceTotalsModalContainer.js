import { connect } from 'react-redux';

import { updateDataDeliveryOrder } from 'pages/DeliveryOrder/modules/actions';
import { EditTotalsModal } from 'components';

const mapStateToProps = ({
  deliveryOrder: {
    total,
    iva,
    taxBase,
    _id,
  },
}) => ({
  total,
  iva,
  taxBase,
  id: _id,
});

const mapDispatchToProps = {
  update: updateDataDeliveryOrder,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditTotalsModal);
