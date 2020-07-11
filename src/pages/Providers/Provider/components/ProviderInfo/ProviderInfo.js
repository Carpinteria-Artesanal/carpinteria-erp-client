import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import { ItemGroupsCard } from 'components';
import { useStyles } from './ProviderInfo.styles';
import { adapterProviderInfo } from './adapterProviderInfo';

const ProviderInfo = ({ ...info }) => {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);

  /**
   * Render edit button
   * @return {Tooltip}
   * @private
   */
  const _renderEditButton = () => (
    <Tooltip title="Editar infomación">
      <IconButton size="small" onClick={() => setShowModal(true)}>
        <EditIcon />
      </IconButton>
    </Tooltip>
  );

  return (
    <Grid
      item
      md={6}
      xs={12}
      className={classes.root}
    >
      <Card>
        <CardHeader
          action={_renderEditButton()}
          title="Datos de contacto"
        />
        <Divider />
        <CardContent className={classes.content}>
          <ItemGroupsCard items={adapterProviderInfo(info)} />
        </CardContent>
      </Card>
    </Grid>
  );
};

ProviderInfo.propTypes = {
  name: PropTypes.string,
  address: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  businessName: PropTypes.string,
  cif: PropTypes.string,
};

ProviderInfo.displayName = 'ProviderInfo';

export default memo(ProviderInfo);
