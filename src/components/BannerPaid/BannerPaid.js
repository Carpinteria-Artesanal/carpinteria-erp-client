import { Alert } from '@material-ui/lab';
import PropTypes from 'prop-types';

const BannerPaid = ({
  paid,
  remaining = 0,
  className,
}) => (
  <Alert severity={paid ? 'success' : 'error'} className={className} variant='filled'>
    {!paid && 'NO '}
    PAGADO
    {remaining > 0 && ` / Pendiente: ${remaining} €`}
  </Alert>
);

BannerPaid.propTypes = {
  className: PropTypes.string,
  paid: PropTypes.bool.isRequired,
  remaining: PropTypes.number,
};

BannerPaid.displayName = 'BannerPaid';

export const story = BannerPaid;
export default BannerPaid;
