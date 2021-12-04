export const INITIAL_STATE = {
  total: '',
  to: null,
  from: null,
  nInvoice: '',
};

export const FIELDS = [
  {
    id: 'nInvoice',
    label: 'Nº Factura',
    options: {
      size: 3,
    },
  },
  {
    id: 'total',
    label: 'Cantidad',
    options: { type: 'number', size: 3 },
  },
];

export const DATE_FIELDS = [
  {
    id: 'from',
    label: 'Desde...',
    options: {
      size: 3,
    },
  },
  {
    id: 'to',
    label: 'Hasta...',
    options: {
      size: 3,
    },
  },
];
