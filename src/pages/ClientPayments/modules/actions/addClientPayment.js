import axios from 'axios';
import { ADD_CLIENT_PAYMENT } from '../types';

/**
 * Request action
 * @returns {{type: string}}
 * @private
 */
const _addClientPaymentRequest = () => ({ type: ADD_CLIENT_PAYMENT.REQUEST });

/**
 * Success action
 * @returns {{type: string}}
 * @private
 */
const _addClientPaymentSuccess = () => ({
  type: ADD_CLIENT_PAYMENT.SUCCESS,
  payload: {
    level: 'success',
    message: 'Pago aplicado',
  },
});

/**
 * Set action
 * @returns {{type: string}}
 * @private
 */
const _addClientPaymentSet = ({ invoices }) => ({
  type: ADD_CLIENT_PAYMENT.SET,
  payload: {
    invoices,
  },
});

/**
 * Error action
 * @param error
 * @returns {{type: string, error: _addClientPaymentError.props}}
 * @private
 */
const _addClientPaymentError = error => ({
  type: ADD_CLIENT_PAYMENT.FAILURE,
  error,
});

/**
 * Confirma la aplicación del pago
 * @param {String} id
 * @param {Object} data
 * @param {function} callback
 */
export const addClientPayment = ({
  id,
  data,
  callback,
}) => async dispatch => {
  dispatch(_addClientPaymentRequest());

  try {
    const response = await axios.post(`client/invoices/${id}/payments`, data);

    dispatch(_addClientPaymentSuccess());
    dispatch(_addClientPaymentSet(response));
    callback();
  } catch (error) {
    dispatch(_addClientPaymentError(error));
  }
};
