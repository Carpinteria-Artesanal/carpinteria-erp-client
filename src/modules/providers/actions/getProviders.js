import axios from 'axios';
import {GET_PROVIDERS} from '../types';

/**
 * Request action for getInitData
 * @returns {{type: string}}
 * @private
 */
const _getProvidersRequest = () => ({type: GET_PROVIDERS.REQUEST});

/**
 * Success action for getInitData
 * @returns {{type: string}}
 * @private
 */
const _getProvidersSuccess = () => ({
  type: GET_PROVIDERS.SUCCESS,
});

const _getProvidersSet = providers => ({
  type: GET_PROVIDERS.SET,
  payload: {
    providers,
  },
});

/**
 * Error action for getInitData
 * @param error
 * @returns {{type: string, error: _getProvidersError.props}}
 * @private
 */
const _getProvidersError = error => ({
  type: GET_PROVIDERS.FAILURE,
  error,
});

/**
 * Trae los proveedores
 * @returns {function(...[*]=)}
 */
export const getProviders = () => async dispatch => {
  dispatch(_getProvidersRequest());

  try {
    const {data} = await axios('providers');

    dispatch(_getProvidersSuccess());
    dispatch(_getProvidersSet(data));
  } catch (error) {
    dispatch(_getProvidersError(error));
  }
};
