import _ from 'lodash';
import globalRedux from './globalRedux';
import uiStateRedux from './uiStateRedux';
import {isAdmin} from '../models/User';
import {AuthReduxActions, AuthReduxSelectors} from './types';

const actions: AuthReduxActions = {} as AuthReduxActions;

actions.fetchLoginUserSuccess = (user) => (dispatch) => {
  dispatch(globalRedux.fetchSuccess([{id: 'loginUser', data: user}]));
};

actions.getLoginUser = () => async (dispatch, _getState, {authService}) => {
  const user = await authService.getLoginUser();
  dispatch(actions.fetchLoginUserSuccess(user));
  return user;
};

actions.loginWithEmail = ({email, password}) => async (dispatch, _getState, {authService}) => {
  const user = await authService.loginWithEmail({email, password});
  dispatch(actions.fetchLoginUserSuccess(user));

  if (isAdmin(user)) {
    dispatch(uiStateRedux.fetchAdminSideBarStatus());
  }

  return user;
};

actions.signupWithEmail = ({name, email, password}) => async (dispatch, _getState, {authService}) => {
  const user = await authService.signupWithEmail({name, email, password});
  dispatch(actions.fetchLoginUserSuccess(user));

  if (isAdmin(user)) {
    dispatch(uiStateRedux.fetchAdminSideBarStatus());
  }

  return user;
};

actions.logout = () => async (dispatch, _getState, {authService}) => {
  await authService.logout();
  dispatch(actions.fetchLoginUserSuccess(null));
};

actions.updateAccountInfo = ({name, email, preferredLanguage}) => async (dispatch, _getState, {authService}) => {
  await authService.updateAccountInfo({name, email, preferredLanguage});
  dispatch(
    actions.updateLoginUserSuccess({
      name,
      email,
      preferredLanguage,
    }),
  );
};
//
// actions.updateAvatar = (file) =>
//     async (dispatch, _getState, {authService}) => {
//     const user = await authService.uploadAvatar(file);
//     dispatch(
//         actions.updateLoginUserSuccess({
//             avatar: user.avatar,
//         }),
//     );
// };

actions.updatePassword = (oldPassword, newPassword) => async (_dispatch, _getState, {authService}) => {
  await authService.updatePassword({oldPassword, newPassword});
};

actions.updateLoginUserSuccess = (data) => (dispatch, getState) => {
  const newUserInfo = {
    ...getState().global?.loginUser,
    ...data,
  };
  dispatch(actions.fetchLoginUserSuccess(newUserInfo));
};

const selectors: AuthReduxSelectors = {
  getLoginUser: (state) => _.get(state, 'global.loginUser.data'),
} as AuthReduxSelectors;

export {actions, selectors};
