import axios from 'axios';
import { TYPES } from '../../constants';
import { DELETE_CLIENT_DOCUMENT } from '../types';

/**
 * Request action
 * @returns {{type: string}}
 * @private
 */
const _deleteClientDocumentRequest = () => ({ type: DELETE_CLIENT_DOCUMENT.REQUEST });

/**
 * Success action
 * @returns {{type: string}}
 * @private
 */
const _deleteClientDocumentSuccess = () => ({
  type: DELETE_CLIENT_DOCUMENT.SUCCESS,
  payload: {
    level: 'success',
    message: 'Factura eliminada',
  },
});

/**
 * Error action
 * @param error
 * @returns {{type: string, error: _deleteClientDocumentError.props}}
 * @private
 */
const _deleteClientDocumentError = error => ({
  type: DELETE_CLIENT_DOCUMENT.FAILURE,
  error,
});

/**
 * Elimina la factura
 * @param {string} id
 * @param {function} callback
 * @param {string} type
 * @returns {function(...[*]=)}
 */
export const deleteClientDocument = ({
  type,
  id,
  callback,
}) => async dispatch => {
  dispatch(_deleteClientDocumentRequest());

  try {
    await axios.delete(`${TYPES[type]}/${id}`);

    dispatch(_deleteClientDocumentSuccess());
    callback();
  } catch (error) {
    dispatch(_deleteClientDocumentError(error));
  }
};
