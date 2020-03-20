/* tslint:disable:no-default-export */
import _ from 'lodash';
import globalRedux from './globalRedux';
import {UIStateReduxActions, UIStateReduxSelectors} from './types';

const actionCreators: UIStateReduxActions = {} as UIStateReduxActions;

actionCreators.toggleAdminSideBar = () => (dispatch, getState) => {
  const currentUiState = getState().global?.uiState?.data;
  const showAdminSideBar = !currentUiState?.showAdminSideBar;
  localStorage.setItem('showAdminSideBar', showAdminSideBar.toString());
  dispatch(actionCreators.updateUiStateSuccess({showAdminSideBar}));
};

actionCreators.fetchAdminSideBarStatus = () => (dispatch, _getState) => {
  const storedValue = localStorage.getItem('showAdminSideBar');
  const show = !storedValue || storedValue === 'true';
  dispatch(actionCreators.updateUiStateSuccess({showAdminSideBar: show}));
};

actionCreators.updateUiStateSuccess = (data) => (dispatch, getState) => {
  const newUiState = {
    id: 'uiState',
    data: {
      ...getState().global?.uiState?.data,
      ...data,
    },
  };
  dispatch(globalRedux.fetchSuccess([newUiState]));
};

export default actionCreators;

export const selector: UIStateReduxSelectors = {
  showAdminSideBar: (state) => _.get(state, 'global.uiState.data.showAdminSideBar', true),
} as UIStateReduxSelectors;
