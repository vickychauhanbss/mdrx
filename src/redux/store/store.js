/* eslint-disable no-underscore-dangle */
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './rootReducer'

const initialState = {};
const middleware = [thunk];
const logger = store => next => action => {
  // console.log('dispatching', action)
  const result = next(action);
  // console.log('next state', store.getState());
  // console.log('action result', result);
  return result;
};
const enhancerList = [];
// eslint-disable-next-line no-undef
const devToolsExtension = window && window.__REDUX_DEVTOOLS_EXTENSION__;

if (typeof devToolsExtension === 'function') {
  enhancerList.push(devToolsExtension());
}

const composedEnhancer = compose(
  applyMiddleware(...middleware),
  ...enhancerList,
  applyMiddleware(logger),
);
// const store = createStore(rootReducer, initialState, composedEnhancer);

const store = createStore(rootReducer, initialState, composedEnhancer);

export default store;
