import axios from 'axios';
import { TYPES } from '../../constants';
import { ADD_PRODUCT } from '../types';

/**
 * Request action
 * @returns {{type: string}}
 * @private
 */
const _createProductRequest = () => ({ type: ADD_PRODUCT.REQUEST });

/**
 * Success action
 * @returns {{type: string}}
 * @private
 */
const _createProductSuccess = () => ({
  type: ADD_PRODUCT.SUCCESS,
  payload: {
    level: 'success',
    message: 'Producto añadido correctamente',
  },
});

/**
 * Set action
 * @param {Object} data
 * @return {{payload: {data: Object}, type: string}}
 * @private
 */
const _createProductSet = data => ({
  type: ADD_PRODUCT.SET,
  payload: data,
});
/**
 * Error action
 * @param error
 * @returns {{type: string, error: _createProductError.props}}
 * @private
 */
const _createProductError = error => ({
  type: ADD_PRODUCT.FAILURE,
  error,
});

/**
 * Añade un albarán a la factura
 * @param {String} id
 * @param {String} type
 * @returns {function(...[*]=)}
 */
export const createProduct = ({
  type,
  invoice,
  model,
}, callback) => async dispatch => {
  dispatch(_createProductRequest());

  try {
    const { data } = await axios.post(
      `${TYPES[type]}/${invoice}/product`,
      model
    );

    dispatch(_createProductSuccess());
    dispatch(_createProductSet(data));
    callback();
  } catch (error) {
    dispatch(_createProductError(error));
  }
};
