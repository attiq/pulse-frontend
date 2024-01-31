import { BrowserRouter as Router } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { configureStore, history } from './store';
import App from './App';

export default function AppContainer() {
  const store = configureStore();

  return (
    <Provider store={store}>
      <ConnectedRouter history={history} store={store}>
        <Router>
          <App />
        </Router>
      </ConnectedRouter>
    </Provider>
  );
}
