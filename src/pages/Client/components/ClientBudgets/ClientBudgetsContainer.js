import { connect } from 'react-redux';

import { getBudgets } from '../../modules/actions';
import ClientBudgets from './ClientBudgets';

const mapStateToProps = ({ client: { budgets } }) => budgets;

const mapDispatchToProps = {
  getBudgets,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClientBudgets);
