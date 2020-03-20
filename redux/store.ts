import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {reducer as globalReducer} from './globalRedux';
import * as services from '../services';
import {InitialRootState, RootState} from './types';

const DEFAULT_INITIAL_STATE: RootState = {
  global: {
    loginUser: {
      id: 'loginUser',
      data: null,
    },
    uiState: {
      id: 'uiState',
      data: {
        showAdminSideBar: false,
      },
    },
  },
};

export const makeStore = (initialState: InitialRootState) => {
  return createStore(
    combineReducers({
      global: globalReducer,
    }),
    {
      ...DEFAULT_INITIAL_STATE,
      ...initialState,
    },
    applyMiddleware(thunk.withExtraArgument(services)),
  );
};
