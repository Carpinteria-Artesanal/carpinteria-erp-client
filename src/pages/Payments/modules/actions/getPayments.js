import axios from 'axios';
import { format, objectToParams } from 'utils';
import { GET_PAYMENTS } from '../types';

/**
 * Request action
 * @returns {{type: string}}
 * @private
 */
const _getPaymentRequest = () => ({ type: GET_PAYMENTS.REQUEST });

/**
 * Success action
 * @returns {{type: string}}
 * @private
 */
const _getPaymentsSuccess = () => ({
  type: GET_PAYMENTS.SUCCESS,
});

const _getPaymentsSet = ({ payments, sum }) => ({
  type: GET_PAYMENTS.SET,
  payload: {
    payments,
    sum,
  },
});

/**
 * Error action
 * @param error
 * @returns {{type: string, error: _getPaymentsError.props}}
 * @private
 */
const _getPaymentsError = error => ({
  type: GET_PAYMENTS.FAILURE,
  error,
});

/**
 * Pide los pagos pendientes de cobro
 * @returns {function(...[*]=)}
 */
export const getPayments = filters => async dispatch => {
  dispatch(_getPaymentRequest());

  const { from, to } = filters || {};
  const dates = {
    ...(from && { from: format.dateToSend(from) }),
    ...(to && { to: format.dateToSend(to) }),
  };

  try {
    const { data } = await axios(`invoices/payments${objectToParams(dates)}`);

    dispatch(_getPaymentsSuccess());
    dispatch(_getPaymentsSet(data));
  } catch (error) {
    dispatch(_getPaymentsError(error));
  }
};
