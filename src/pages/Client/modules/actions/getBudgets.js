import axios from 'axios';
import { objectToParams } from 'utils';
import { GET_BUDGETS } from '../types';

/**
 * Request action
 * @returns {{type: string}}
 * @private
 */
const _getBudgetsRequest = () => ({ type: GET_BUDGETS.REQUEST });

/**
 * Success action
 * @returns {{type: string}}
 * @private
 */
const _getBudgetsSuccess = () => ({
  type: GET_BUDGETS.SUCCESS,
});

/**
 * Set action
 * @param {Object} budgets
 * @return {{payload: {provider: Object, billing: Object}, type: string}}
 * @private
 */
const _getBudgetsSet = budgets => ({
  type: GET_BUDGETS.SET,
  payload: { budgets },
});

/**
 * Error action for getInitData
 * @param error
 * @returns {{type: string, error: _getBudgetsError.props}}
 * @private
 */
const _getBudgetsError = error => ({
  type: GET_BUDGETS.FAILURE,
  error,
});

/**
 * Trae los clientes
 * @returns {function(...[*]=)}
 */
export const getBudgets = filters => async dispatch => {
  dispatch(_getBudgetsRequest());

  try {
    const { data } = await axios(`budgets/short${objectToParams(filters)}`);

    dispatch(_getBudgetsSuccess());
    dispatch(_getBudgetsSet(data));
  } catch (error) {
    dispatch(_getBudgetsError(error));
  }
};
