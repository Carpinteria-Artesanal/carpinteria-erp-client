import axios from 'axios';
import { TYPES } from '../../constants';
import { ADD_CLIENT_DOCUMENT } from '../types';

/**
 * Request action
 * @returns {{type: string}}
 * @private
 */
const _createClientDocumentRequest = () => ({ type: ADD_CLIENT_DOCUMENT.REQUEST });

/**
 * Success action
 * @returns {{type: string}}
 * @private
 */
const _createClientDocumentSuccess = () => ({
  type: ADD_CLIENT_DOCUMENT.SUCCESS,
  payload: {
    level: 'success',
    message: 'Documento añadido correctamente',
  },
});

/**
 * Set action
 * @param {Object} data
 * @return {{payload: {data: Object}, type: string}}
 * @private
 */
const _createClientDocumentSet = data => ({
  type: ADD_CLIENT_DOCUMENT.SET,
  payload: data,
});
/**
 * Error action
 * @param error
 * @returns {{type: string, error: _createClientDocumentError.props}}
 * @private
 */
const _createClientDocumentError = error => ({
  type: ADD_CLIENT_DOCUMENT.FAILURE,
  error,
});

/**
 * Añade un albarán a la factura
 * @param {String} id
 * @param {String} type
 * @returns {function(...[*]=)}
 */
export const createClientDocument = (type, id) => async dispatch => {
  dispatch(_createClientDocumentRequest());

  try {
    const { data } = await axios.post(`${TYPES[type]}/${id}/deliveryOrder`);

    dispatch(_createClientDocumentSuccess());
    dispatch(_createClientDocumentSet(data));
  } catch (error) {
    dispatch(_createClientDocumentError(error));
  }
};
