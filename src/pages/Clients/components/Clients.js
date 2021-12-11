import {
  memo, useCallback, useReducer, useState,
} from 'react';
import { Box, Container } from '@material-ui/core';
import PropTypes from 'prop-types';
import { PlusCircle as PlusCircleIcon } from 'react-feather';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';

import { BASE_PATH } from 'constants/index';
import {
  Header, Page, SearchWithoutState, TableMaterial,
} from 'components';

import { fields, INITIAL_STATE } from '../constans';
import { useStyles } from './Clients.styles';
import NewProviderModal from '../modals/NewClientModal';

const Clients = ({
  clients,
  getClients,
  count,
}) => {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);

  const [filters, setFilters] = useReducer(
    (oldstate, newState) => ({ ...oldstate, ...newState }),
    INITIAL_STATE,
  );

  const _getData = useCallback((pagination = {}) => {
    const {
      name,
      phone,
      email,
    } = filters;

    getClients({
      ...(name && { name }),
      ...(phone && { phone }),
      ...(email && { email }),
      ...pagination,
    });
  }, [filters]);

  const _hrefRow = ({ _id }) => `${BASE_PATH}/clientes/${_id}`;

  /**
   * Oculta el modal de crear proveedor
   * @type {function(): void}
   * @private
   */
  const _closeModal = useCallback(() => setShowModal(false), [setShowModal]);

  return (
    <>
      <Page className={classes.root} title='Clientes'>
        <Container maxWidth={false}>
          <Header
            title='Clientes'
            buttons={[
              {
                onClick: () => setShowModal(true),
                Icon: PlusCircleIcon,
                label: 'Nuevo Cliente',
              },
            ]}
          />
          <SearchWithoutState
            get={_getData}
            fields={fields}
            initialState={INITIAL_STATE}
            state={filters}
            setState={setFilters}
          />
          <Box mt={3}>
            <TableMaterial
              className={classes.table}
              columns={[
                {
                  title: 'Nombre',
                  field: 'name',
                },
                {
                  title: 'Dirección',
                  field: 'address',
                },
                {
                  title: 'Teléfono',
                  field: 'phone',
                },
                {
                  title: 'Correo electrónico',
                  field: 'email',
                },
              ]}
              data={clients}
              title={`Clientes (${count})`}
              actions={[
                {
                  icon: VisibilityIcon,
                  tooltip: 'Editar',
                  component: Link,
                  to: _hrefRow,
                },
              ]}
              href={_hrefRow}
              count={count}
              rowsPerPageOptions={[20, 50, 100]}
              refresh={_getData}
            />
          </Box>
        </Container>
      </Page>
      <NewProviderModal show={showModal} close={_closeModal} />
    </>
  );
};

Clients.propTypes = {
  clients: PropTypes.array.isRequired,
  getClients: PropTypes.func.isRequired,
  count: PropTypes.number,
};

Clients.displayName = 'Clients';

export const story = Clients;
export default memo(Clients);
