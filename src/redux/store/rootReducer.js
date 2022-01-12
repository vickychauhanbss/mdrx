import {combineReducers} from 'redux';
import {RESET_STORE} from '../resetStore/resetType';
import report from '../Reports/reducers';

const appReducer = combineReducers({
  report,
});

// reset the state of a redux store
const rootReducer = (state, action) => {
  if (action.type === RESET_STORE) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
