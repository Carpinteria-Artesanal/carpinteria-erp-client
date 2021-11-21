import { createReducer, setPayload } from 'store/utils';
import { GET_CLIENT_PAYMENTS } from './types';

const INITIAL_STATE = {
  invoices: [],
};

const ACTION_HANDLERS = {
  [GET_CLIENT_PAYMENTS.SET]: setPayload,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
