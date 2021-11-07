import { requestActions } from 'utils/requestActions';

export const GET_CLIENT_DOCUMENT = requestActions('@client-document/GET_DELIVERY_ORDER');
export const CONFIRM_DOCUMENT = requestActions('@client-document/CONFIRM_INVOICE');
export const UPDATE_DATA = requestActions('@client-document/UPDATE_DATA');
export const RESET_CLIENT_DOCUMENT = '@client-document/RESET_CLIENT_INVOICE';

export const ADD_CLIENT_DOCUMENT = requestActions('@client-document/ADD_DELIVERY_ORDER');
export const UPDATE_CLIENT_DOCUMENT = requestActions('@client-document/UPDATE_DELIVERY_ORDER');
export const DELETE_CLIENT_DOCUMENT = requestActions('@client-document/DELETE_CLIENT_INVOICE');

export const ADD_PRODUCT = requestActions('@client-document/ADD_PRODUCT');
export const UPDATE_PRODUCT = requestActions('@client-document/UPDATE_PRODUCT');
export const DELETE_PRODUCT = requestActions('@client-document/DELETE_PRODUCT');
