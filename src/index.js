import 'react-perfect-scrollbar/dist/css/styles.css';
import 'nprogress/nprogress.css';
import 'moment/locale/es';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { SettingsProvider } from 'context/SettingsContext';
import { configureStore } from 'store';
import { restoreSettings } from 'utils/settings';
import App from 'App';

const store = configureStore();
const settings = restoreSettings();

ReactDOM.render(
  <Provider store={store}>
    <SettingsProvider settings={settings}>
      <App />
    </SettingsProvider>
  </Provider>,
  document.getElementById('root'),
);
