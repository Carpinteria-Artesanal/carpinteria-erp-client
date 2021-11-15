import axios from 'axios';
import { TYPES } from '../../constants';
import { UPDATE_DATA } from '../types';

/**
 * Request action
 * @returns {{type: string}}
 * @private
 */
const _updateDataClientDocumentRequest = () => ({ type: UPDATE_DATA.REQUEST });

/**
 * Success action
 * @returns {{type: string}}
 * @private
 */
const _updateDataClientDocumentSuccess = () => ({
  type: UPDATE_DATA.SUCCESS,
  payload: {
    level: 'success',
    message: 'La factura se ha actualizado correctamente',
  },
});

/**
 * Set action
 * @param {number} date
 * @param {Object} totals
 * @return {{payload: Object, type: string}}
 * @private
 */
const _updateDataClientDocumentSet = ({ date, totals }) => ({
  type: UPDATE_DATA.SET,
  payload: {
    ...(date && { date }),
    ...(totals && { totals }),
  },
});

/**
 * Error action
 * @param error
 * @returns {{type: string, error: _updateDataClientDocumentError.props}}
 * @private
 */
const _updateDataClientDocumentError = error => ({
  type: UPDATE_DATA.FAILURE,
  error,
});

/**
 * Actualiza los datos de la factura de cliente
 * @param {String} id
 * @param {{date: number, totals: Object}} newData
 * @param {function} callback
 * @param {string} type
 * @returns {function(...[*]=)}
 */
export const updateDataClientDocument = ({
  id,
  newData,
  callback,
  type,
}) => async dispatch => {
  dispatch(_updateDataClientDocumentRequest());

  console.warn(id);
  try {
    const { data } = await axios.patch(`${TYPES[type]}/${id}`, newData);

    dispatch(_updateDataClientDocumentSuccess());
    dispatch(_updateDataClientDocumentSet(data));
    callback?.();
  } catch (error) {
    dispatch(_updateDataClientDocumentError(error));
  }
};
