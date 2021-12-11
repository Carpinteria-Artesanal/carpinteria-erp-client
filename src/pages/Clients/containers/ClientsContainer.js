import { connect } from 'react-redux';

import Clients from '../components/Clients';
import { getClients } from '../modules/actions';

const mapStateToProps = ({ clients: { clients, count } }) => ({
  clients, count,
});

const mapDispatchToProps = {
  getClients,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Clients);
