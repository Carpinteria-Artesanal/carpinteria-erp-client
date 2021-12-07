/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';

import InvoiceData from './components/InvoiceData';
import InvoiceTotals from './components/InvoiceTotals';
import { useStyles } from './InvoiceCards.styles';

const InvoiceCards = ({
  data, totals, paymentType, id, paid,
}) => {
  const classes = useStyles();

  return (
    <>
      <InvoiceData {...data} className={classes.data} id={id} />
      <InvoiceTotals {...totals} className={classes.totals} paymentType={paymentType} paid={paid} />
    </>
  );
};

InvoiceCards.propTypes = {
  totals: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  paymentType: PropTypes.string.isRequired,
  paid: PropTypes.bool,
  id: PropTypes.string.isRequired,
};

InvoiceCards.displayName = 'InvoiceCards';

export default InvoiceCards;
