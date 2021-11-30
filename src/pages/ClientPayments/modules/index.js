import { createReducer, setPayload } from 'store/utils';
import { ADD_CLIENT_PAYMENT, GET_CLIENT_PAYMENTS } from './types';

const INITIAL_STATE = {
  invoices: [],
  count: 0,
};

const ACTION_HANDLERS = {
  [GET_CLIENT_PAYMENTS.SET]: setPayload,
  [ADD_CLIENT_PAYMENT.SET]: setPayload,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
