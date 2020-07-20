import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { TableMaterial } from 'components';
import { format } from 'utils';
import { useStyles } from './PricesTable.styles';

const PricesTable = ({ prices }) => {
  const classes = useStyles();

  return Boolean(prices.length) && (
    <TableMaterial
      className={classes.table}
      columns={[
        {
          title: 'Fecha',
          render: ({ date }) => format.date(date),
        },
        {
          title: 'Prices',
          render: ({ price }) => format.euro(price),
        },
      ]}
      data={prices}
    />
  );
};

PricesTable.propTypes = {
  prices: PropTypes.array.isRequired,
};

PricesTable.displayName = 'PricesTable';
export const story = PricesTable;
export default memo(PricesTable);