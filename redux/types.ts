import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AnyAction, DeepPartial} from 'redux';
import {AuthService} from '../services/AuthService';

// common
export interface InitialRootState {
  global: {
    loginUser: {
      id: string;
      data: object | null;
    };
    uiState: {
      id: string;
      data: {
        showAdminSideBar: boolean;
      } | null;
    };
  };
}

export type RootState = DeepPartial<InitialRootState>;

export type CommonReduxCrudAction = {data: any; records: any; type: any};

export type CommonReduxActionType = CommonReduxCrudAction | AnyAction | any;

export type CommonThunkDispatch<Result, Services = {authService: AuthService}> = ThunkDispatch<
  Result | CommonReduxActionType,
  Services,
  AnyAction
>;

export type CommonReduxThunkAction<
  Result,
  State = RootState,
  Services = {authService: AuthService},
  Action extends AnyAction = AnyAction
> = ThunkAction<Result | CommonReduxActionType, State, Services, Action>;

export type CommonReduxThunkActionCreator<Payload, T> = (...payload: Payload[]) => CommonReduxThunkAction<T>;

// for AuthRedux module
export type AuthReduxActions = {
  getLoginUser: () => CommonReduxThunkAction<any>; //CommonReduxThunkActionCreator<any, Promise<any>>,
  fetchLoginUserSuccess: (user: object | null) => CommonReduxThunkAction<Promise<any>>;
  loginWithEmail: CommonReduxThunkActionCreator<{email: string; password: string}, Promise<any>>;
  signupWithEmail: CommonReduxThunkActionCreator<{name: string; email: string; password: string}, Promise<any>>;
  logout: () => CommonReduxThunkAction<any>;
  updateAccountInfo: CommonReduxThunkActionCreator<
    {name: string; email: string; preferredLanguage: string},
    Promise<any>
  >;
  updateLoginUserSuccess: (data: object) => CommonReduxThunkAction<any>;
  updatePassword: (oldPassword: string, newPassword: string) => CommonReduxThunkAction<Promise<any>>;
  updateAvatar: (file: any) => CommonReduxThunkAction<Promise<any>>;
};

export type AuthReduxSelectors = {
  getLoginUser: (state: RootState) => object;
};

// for UISTateRedux module
export type UIStateReduxActions = {
  toggleAdminSideBar: () => CommonReduxThunkAction<any>;
  fetchAdminSideBarStatus: () => CommonReduxThunkAction<any>;
  updateUiStateSuccess: (data: object) => CommonReduxThunkAction<any>;
};
export type UIStateReduxSelectors = {
  showAdminSideBar: (state: RootState) => boolean;
};
