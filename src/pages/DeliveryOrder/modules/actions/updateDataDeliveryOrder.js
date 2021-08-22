import axios from 'axios';
import { UPDATE_DATA } from '../types';

/**
 * Request action
 * @returns {{type: string}}
 * @private
 */
const _updateDataDeliveryOrderRequest = () => ({ type: UPDATE_DATA.REQUEST });

/**
 * Success action
 * @returns {{type: string}}
 * @private
 */
const _updateDataDeliveryOrderSuccess = () => ({
  type: UPDATE_DATA.SUCCESS,
  payload: {
    level: 'success',
    message: 'El albarán se ha actualizado correctamente',
  },
});

/**
 * Set action
 * @param {number} date
 * @param {Object} totals
 * @return {{payload: Object, type: string}}
 * @private
 */
const _updateDataDeliveryOrderSet = ({
  date,
  totals,
}) => ({
  type: UPDATE_DATA.SET,
  payload: {
    ...(date && { date }),
    ...(totals && { totals }),
  },
});

/**
 * Error action
 * @param error
 * @returns {{type: string, error: _updateDataDeliveryOrderError.props}}
 * @private
 */
const _updateDataDeliveryOrderError = error => ({
  type: UPDATE_DATA.FAILURE,
  error,
});

/**
 * Actualiza los datos de la factura de cliente
 * @param {String} id
 * @param {{date: number, totals: Object}} newData
 * @param {function} callback
 * @returns {function(...[*]=)}
 */
export const updateDataDeliveryOrder = (id, newData, callback) => async dispatch => {
  dispatch(_updateDataDeliveryOrderRequest());

  try {
    const { data } = await axios.patch(`deliveryorders/${id}`, newData);

    dispatch(_updateDataDeliveryOrderSuccess());
    dispatch(_updateDataDeliveryOrderSet(data));
    callback?.();
  } catch (error) {
    dispatch(_updateDataDeliveryOrderError(error));
  }
};
