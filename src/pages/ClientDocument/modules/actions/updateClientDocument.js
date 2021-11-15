import axios from 'axios';
import { format } from 'utils';
import { TYPES } from '../../constants';
import { UPDATE_CLIENT_DOCUMENT } from '../types';

/**
 * Request action
 * @returns {{type: string}}
 * @private
 */
const _updateClientDocumentRequest = () => ({ type: UPDATE_CLIENT_DOCUMENT.REQUEST });

/**
 * Success action
 * @returns {{type: string}}
 * @private
 */
const _updateClientDocumentSuccess = () => ({
  type: UPDATE_CLIENT_DOCUMENT.SUCCESS,
  payload: {
    level: 'success',
    message: 'Fecha del documento actualizada',
  },
});

/**
 * Error action
 * @param error
 * @returns {{type: string, error: _updateClientDocumentError.props}}
 * @private
 */
const _updateClientDocumentError = error => ({
  type: UPDATE_CLIENT_DOCUMENT.FAILURE,
  error,
});

/**
 * Actualiza los datos de la factura de cliente
 * @param {String} id
 * @param {String} deliveryOrderId
 * @param {Date} date
 * @param {string} type
 * @returns {function(...[*]=)}
 */
export const updateClientDocument = ({
  id,
  deliveryOrderId,
  date,
  type,
}) => async dispatch => {
  dispatch(_updateClientDocumentRequest());

  try {
    await axios.patch(
      `${TYPES[type]}/${id}/deliveryOrder/${deliveryOrderId}`,
      { date: format.dateToSend(date) },
    );

    dispatch(_updateClientDocumentSuccess());
  } catch (error) {
    dispatch(_updateClientDocumentError(error));
  }
};
