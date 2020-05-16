import React, {memo, useEffect, useState} from 'react';
import {Box, Container, Grid} from '@material-ui/core';
import PropTypes from 'prop-types';

import {Header, Page} from 'components';
import {useStyles} from 'pages/Providers/Provider/components/Provider.styles';
import ProviderInfo from 'pages/Providers/Provider/components/ProviderInfo';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ProviderBilling from 'pages/Providers/Provider/components/ProviderBilling';

const Provider = ({provider, billing, getProvider, match: {params: {idProvider}}, showEditModal}) => {
  const classes = useStyles();
  const [expand, setExpand] = useState(false);
  useEffect(() => {
    getProvider(idProvider);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idProvider]);

  /**
   * Expande o contrae la información
   * @private
   */
  const _toggleExpand = () => {
    setExpand(!expand);
  };

  /**
   * Abre el modal de edición de proveedor
   * @private
   */
  const _showEditModal = () => {
    showEditModal(idProvider, provider);
  }

  return (
    <Page className={classes.root} title={provider.name}>
      <Container maxWidth={false} className={classes.container}>
        <Header title="Proveedor" description={provider.name} buttonsSecondary={[{
          variant: 'text',
          onClick: _toggleExpand,
          Icon: expand ? ExpandLessIcon : ExpandMoreIcon,
          disableSvg: true,
          label: expand ? 'Ocultar información' : 'Mostrar información',
        }]}/>
        {expand &&
        <Box mt={3}>
          <Grid container spacing={3}>
            <ProviderInfo {...provider} showEditModal={_showEditModal}/>
            <ProviderBilling {...billing} />
          </Grid>
        </Box>
        }
      </Container>
    </Page>
  );
};

Provider.propTypes = {
  getProviders: PropTypes.func.isRequired,
  providers: PropTypes.array.isRequired,
  billing: PropTypes.object,
  getProvider: PropTypes.func.isRequired,
  showEditModal: PropTypes.func.isRequired,
};

Provider.displayName = 'Providers';

export default memo(Provider);
