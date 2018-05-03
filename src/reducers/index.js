import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import loginIn from './loginReducer';
import nav from './navReducers';
import home from './HomeReducers';
import project from './ProjectReducers';

// you can add  millions of routes here!
// const rootReducer = {
//   nav,
//   loginIn,
// };
// export default rootReducer;
const loginInPersistConfig = {
  key: 'loginIn',
  storage,
  whitelist: ['isSuccess', 'status'],
};

const projectPersistConfig = {
  key: 'project',
  storage,
  whitelist: ['projectInfo'],
};

const rootReducer = combineReducers({
  nav,
  loginIn: persistReducer(loginInPersistConfig, loginIn),
  home,
  project, //: persistReducer(projectPersistConfig, project),
});

export default rootReducer;
