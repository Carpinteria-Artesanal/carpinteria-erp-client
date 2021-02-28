import { combineReducers } from 'redux';
import providers from 'modules/providers';
import products from 'modules/products';

import billing from 'pages/reports/Billing/modules';
import book from 'pages/Book/modules';
import client from 'pages/Client/modules';
import clientBook from 'pages/ClientBook/modules';
import clientInvoice from 'pages/ClientInvoice/modules';
import clients from 'pages/Clients/modules';
import dashboard from 'pages/Dashboard/modules';
import doCount from 'pages/reports/DeliveryOrders/modules';
import invoice from 'pages/Invoice/modules';
import notes from 'pages/Notes/modules';
import priceChanges from 'pages/PriceChanges/modules';
import product from 'pages/Product/modules';
import productsClients from 'pages/Products/modules';
import payments from 'pages/Payments/modules';

import notifications from './notifications';
import modal from './modal';
import account from './account';

const rootReducer = combineReducers({
  account,
  billing,
  book,
  client,
  clientBook,
  clientInvoice,
  clients,
  dashboard,
  doCount,
  invoice,
  notes,
  priceChanges,
  product,
  products,
  productsClients,
  providers,
  payments,
  /**
   * Reducers del sistema
   */
  notifications,
  modal,
});

export default rootReducer;
