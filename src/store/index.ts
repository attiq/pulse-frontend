import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware as createRouterMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducers';

export const history = createHistory();
export const routerMiddleware = createRouterMiddleware(history);

export function configureStore() {
  // configure middlewares
  const middlewares: any = [routerMiddleware, thunk];
  // compose enhancers
  const enhancer: any = compose(applyMiddleware(...middlewares));
  // create store
  return createStore(rootReducer, {}, enhancer);
}
