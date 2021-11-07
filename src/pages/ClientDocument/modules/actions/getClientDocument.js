import axios from 'axios';
import { TYPES } from '../../constants';
import { GET_CLIENT_DOCUMENT } from '../types';

/**
 * Request action
 * @returns {{type: string}}
 * @private
 */
const _getClientDocumentRequest = () => ({ type: GET_CLIENT_DOCUMENT.REQUEST });

/**
 * Success action
 * @returns {{type: string}}
 * @private
 */
const _getClientDocumentSuccess = () => ({
  type: GET_CLIENT_DOCUMENT.SUCCESS,
});

/**
 * Set action
 * @param {Object} data
 * @return {{payload: {provider: Object}, type: string}}
 * @private
 */
const _getClientDocumentSet = data => ({
  type: GET_CLIENT_DOCUMENT.SET,
  payload: data,
});

/**
 * Error action for getClientDocument
 * @param error
 * @returns {{type: string, error: _getClientDocumentError.props}}
 * @private
 */
const _getClientDocumentError = error => ({
  type: GET_CLIENT_DOCUMENT.FAILURE,
  error,
});

/**
 * Trae las facturas de clientes
 * @returns {function(...[*]=)}
 */
export const getClientDocument = (type, id) => async dispatch => {
  dispatch(_getClientDocumentRequest());

  try {
    const { data } = await axios(`${TYPES[type]}/${id}`);

    dispatch(_getClientDocumentSuccess());
    dispatch(_getClientDocumentSet(data));
  } catch (error) {
    dispatch(_getClientDocumentError(error));
  }
};
