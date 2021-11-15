import { createReducer, setPayload } from 'store/utils';
import {
  ADD_CLIENT_DOCUMENT,
  ADD_PRODUCT,
  CONFIRM_DOCUMENT,
  DELETE_CLIENT_DOCUMENT,
  DELETE_PRODUCT,
  GET_CLIENT_DOCUMENT,
  RESET_CLIENT_DOCUMENT,
  UPDATE_DATA,
  UPDATE_PRODUCT,
} from './types';

const INITIAL_STATE = {
  _id: '',
  client: '',
  nameClient: '',
  products: [],
  date: null,
  total: 0,
  iva: 0,
  taxBase: 0,
};

const setDataTotals = (state, {
  payload: {
    date,
    totals,
  },
}) => ({
  ...state,
  ...(date && { date }),
  ...(totals),
});

const setNInvoice = (state, { payload: { nInvoice } }) => ({
  ...state,
  nInvoice,
});

const ACTION_HANDLERS = {
  [GET_CLIENT_DOCUMENT.SET]: setPayload,
  [UPDATE_DATA.SET]: setDataTotals,
  [RESET_CLIENT_DOCUMENT]: () => INITIAL_STATE,
  [ADD_CLIENT_DOCUMENT.SET]: setPayload,
  [DELETE_CLIENT_DOCUMENT.SET]: () => INITIAL_STATE,
  [ADD_PRODUCT.SET]: setPayload,
  [UPDATE_PRODUCT.SET]: setPayload,
  [DELETE_PRODUCT.SET]: setPayload,
  [CONFIRM_DOCUMENT.SET]: setNInvoice,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
