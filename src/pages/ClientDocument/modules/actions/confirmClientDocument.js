import axios from 'axios';
import { TYPES } from '../../constants';
import { CONFIRM_DOCUMENT } from '../types';

/**
 * Request action
 * @returns {{type: string}}
 * @private
 */
const _confirmClientDocumentRequest = () => ({ type: CONFIRM_DOCUMENT.REQUEST });

/**
 * Success action
 * @returns {{type: string}}
 * @private
 */
const _confirmClientDocumentSuccess = () => ({
  type: CONFIRM_DOCUMENT.SUCCESS,
  payload: {
    level: 'success',
    message: 'Número asignado',
  },
});

/**
 * Set action
 * @param {Object} data
 * @return {{payload: {data: Object}, type: string}}
 * @private
 */
const _confirmClientDocumentSet = data => ({
  type: CONFIRM_DOCUMENT.SET,
  payload: data,
});

/**
 * Error action
 * @param error
 * @returns {{type: string, error: _confirmClientDocumentError.props}}
 * @private
 */
const _confirmClientDocumentError = error => ({
  type: CONFIRM_DOCUMENT.FAILURE,
  error,
});

/**
 * Confirma el documento
 * @returns {function(...[*]=)}
 */
export const confirmClientDocument = (type, id) => async dispatch => {
  dispatch(_confirmClientDocumentRequest());

  try {
    const { data } = await axios.patch(`${TYPES[type]}/${id}/confirm`);

    dispatch(_confirmClientDocumentSuccess());
    dispatch(_confirmClientDocumentSet(data));
  } catch (error) {
    dispatch(_confirmClientDocumentError(error));
  }
};
