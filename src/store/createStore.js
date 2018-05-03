/**
 * Created by Roc on 2017/6/14.
 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import reduxReset from 'redux-reset';
import reducers from '../reducers';
import project from "../reducers/ProjectReducers";

const navMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);
//
// // 定义中间件数组，默认包括thunk middleware
const middlewares = [thunk.withExtraArgument(), navMiddleware];
//
// 只有开发环境才使用logger middleware
if (__DEV__) {
  middlewares.push(logger);
}
//
// 将中间件柯里化
const middleware = applyMiddleware(...middlewares);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['loginIn', 'project'],
};



// const rootReducer = combineReducers({
//   // every modules reducer should be define here
//   ...reducers,
// });

const persistedReducer = persistReducer(persistConfig, reducers);

export default (preloadedState = {}) => {
  const store = createStore(persistedReducer, preloadedState, compose(middleware, reduxReset()));
  const persistor = persistStore(store);
  return { store, persistor };
};

