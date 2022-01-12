/* eslint-disable import/prefer-default-export */
import {RESET_STORE} from './resetType';

// to reset the state of redux store
export const resetStore = () => {
  return {
    type: RESET_STORE,
  };
};
