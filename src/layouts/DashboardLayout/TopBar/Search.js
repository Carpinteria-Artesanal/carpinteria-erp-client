/* eslint-disable react/destructuring-assignment */
import { memo, useRef, useState } from 'react';
import {
  ClickAwayListener,
  Hidden,
  Input,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useSelector } from 'react-redux';

import { navigateTo } from 'utils';
import { useStyles } from './Search.styles';

/**
 * Barra de busqueda de proveedores
 */
const Search = () => {
  const classes = useStyles();
  const searchRef = useRef(null);
  const [openSearchPopover, setOpenSearchPopover] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  // eslint-disable-next-line no-shadow
  const providers = useSelector(({ providers }) => providers.providers);

  /**
   * Establece el texto buscado en el estado
   * abre o cierra la lista de sugerencias
   * @param {String} value
   * @private
   */
  const _handleSearchChange = ({ target: { value } }) => {
    setSearchValue(value);

    // eslint-disable-next-line no-unused-expressions,mdx/no-unused-expressions
    value
      ? !openSearchPopover && setOpenSearchPopover(true)
      : setOpenSearchPopover(false);
  };

  /**
   * Cierra la lista de sugerencias a pinchar en otro
   * sitio de la pantalla
   * @private
   */
  const _handleSearchPopverClose = () => {
    setOpenSearchPopover(false);
  };

  /**
   * Navigate to provider selected
   * @param {String} idProvider
   * @private
   */
  const _handleSelectProvider = idProvider => {
    _handleSearchPopverClose();
    navigateTo(`proveedores/${idProvider}`);
  };

  /**
   * Filtra los posibles proveedores que coincidan
   * con la búsqueda
   * @param {{name: String}} provider
   * @return {boolean}
   * @private
   */
  const _filterPossibles = provider => provider.name
    .toLowerCase()
    .includes(searchValue.toLowerCase());

  /**
   * Renderiza un elemento de la busqueda
   * @param {{_id: String, name: String}} search
   * @return {ListItem}
   * @private
   */
  const _renderSearchedItem = search => (
    <ListItem
      button
      key={search._id}
      onClick={() => _handleSelectProvider(search._id)}
    >
      <ListItemIcon>
        <SearchIcon />
      </ListItemIcon>
      <ListItemText primary={search.name} />
    </ListItem>
  );

  return (
    <Hidden smDown>
      <div
        className={classes.search}
        ref={searchRef}
      >
        <SearchIcon className={classes.searchIcon} />
        <Input
          className={classes.searchInput}
          disableUnderline
          onChange={_handleSearchChange}
          placeholder='Buscar proveedor'
          value={searchValue}
        />
      </div>
      <Popper
        anchorEl={searchRef.current}
        className={classes.searchPopper}
        open={openSearchPopover}
        transition
      >
        <ClickAwayListener onClickAway={_handleSearchPopverClose}>
          <Paper
            className={classes.searchPopperContent}
            elevation={3}
          >
            <List>
              {providers
                .filter(_filterPossibles)
                .map(_renderSearchedItem)}
            </List>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </Hidden>
  );
};

Search.displayName = 'Search';

export default memo(Search);
