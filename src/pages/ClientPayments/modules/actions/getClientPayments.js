import axios from 'axios';
import { objectToParams } from 'utils';
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

const _getClientPaymentsSet = ({
  invoices,
  count,
}) => ({
  type: GET_CLIENT_PAYMENTS.SET,
  payload: {
    invoices,
    count,
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
export const getClientPayments = filters => async dispatch => {
  dispatch(_getClientPaymentsRequest());
  try {
    const { data } = await axios(`client/invoices/unpaid${objectToParams(filters)}`);

    dispatch(_getClientPaymentsSuccess());
    dispatch(_getClientPaymentsSet(data));
  } catch (error) {
    dispatch(_getClientPaymentsError(error));
  }
};
