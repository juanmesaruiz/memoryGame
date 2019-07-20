import { applyMiddleware, compose, createStore } from 'redux'
import reducers from '../reducers'
import thunk from 'redux-thunk'

const configureStore = () => {
  const initialState = {};
  const enhancers = [];
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
  enhancers.push(devToolsExtension());

  const composedEnhancers = compose(
    applyMiddleware(thunk),
    ...enhancers
  );

  const store = createStore(reducers, initialState, composedEnhancers);

  return { store }
};

export default configureStore
