import { memo } from 'react';
import PropTypes from 'prop-types';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import { NavLink } from 'react-router-dom';

import { Header } from 'components';

const HeaderBook = ({ year, type }) => (
  <Header
    title={`Libro ${type}`}
    description={`Libro ${type} ${year}`}
    routes={[{
      link: '/app/clientes/listado',
      title: 'Clientes',
    }]}
    buttons={[
      {
        component: NavLink,
        to: `/app/clientes/libro/${type}/${year - 1}`,
        Icon: SkipPreviousIcon,
        label: `${year - 1}`,
        variant: 'outlined',
      },
      {
        component: NavLink,
        to: `/app/clientes/libro/${type}/${year + 1}`,
        Icon: SkipNextIcon,
        label: `${year + 1}`,
        variant: 'outlined',
      },
    ]}
  />
);

HeaderBook.propTypes = {
  year: PropTypes.number.isRequired,
  type: PropTypes.number.isRequired,
};

HeaderBook.displayName = 'HeaderBook';
export const story = HeaderBook;
export default memo(HeaderBook);
