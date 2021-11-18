import axios from 'axios';
import history from 'store/history';
import { CREATE_BUDGET } from '../types';

/**
 * Request action
 * @returns {{type: string}}
 * @private
 */
const _createBudgetRequest = () => ({ type: CREATE_BUDGET.REQUEST });

/**
 * Success action
 * @returns {{type: string}}
 * @private
 */
const _createBudgetSuccess = () => ({
  type: CREATE_BUDGET.SUCCESS,
});

/**
 * Error action
 * @param error
 * @returns {{type: string, error: _createBudgetError.props}}
 * @private
 */
const _createBudgetError = error => ({
  type: CREATE_BUDGET.FAILURE,
  error,
});

/**
 * Crear presupuesto de cliente
 * @param {String} id
 */
export const createBudget = id => async dispatch => {
  dispatch(_createBudgetRequest());

  try {
    const { data } = await axios.post('budgets', { client: id });

    dispatch(_createBudgetSuccess());
    history.push(`/app/clientes/presupuestos/${data.id}`);
  } catch (error) {
    dispatch(_createBudgetError(error));
  }
};
