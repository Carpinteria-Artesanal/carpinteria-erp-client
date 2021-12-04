import axios from 'axios';
import { GET_CLIENT_PAYMENTS } from '../types';

/**
 * Request action
 * @returns {{type: string}}
 * @private
 */
const _getClientPaymentsRequest = () => ({ type: GET_CLIENT_PAYMENTS.REQUEST });

/**
 * Success action
 * @returns {{type: string}}
 * @private
 */
const _getClientPaymentsSuccess = () => ({
  type: GET_CLIENT_PAYMENTS.SUCCESS,
});

const _getClientPaymentsSet = ({ invoices }) => ({
  type: GET_CLIENT_PAYMENTS.SET,
  payload: {
    invoices,
  },
});

/**
 * Error action
 * @param error
 * @returns {{type: string, error: _getClientPaymentsError.props}}
 * @private
 */
const _getClientPaymentsError = error => ({
  type: GET_CLIENT_PAYMENTS.FAILURE,
  error,
});

/**
 * Trae las facturas del cliente
 * @returns {function(...[*]=)}
 */
export const getClientPayments = () => async dispatch => {
  dispatch(_getClientPaymentsRequest());
  try {
    const { data } = await axios('client/invoices/unpaid');

    dispatch(_getClientPaymentsSuccess());
    dispatch(_getClientPaymentsSet(data));
  } catch (error) {
    dispatch(_getClientPaymentsError(error));
  }
};