import React from 'react';
import {connect, ConnectedComponent} from 'react-redux';
import {AnyAction, compose} from 'redux';
import {NextComponentType} from 'next';
import Router from 'next/router';

import {selectors} from '../../redux/authRedux';
import {actions as authRedux} from '../../redux/authRedux';
import {authService} from '../../services';
import {adminLayoutWrapper} from './AdminLayoutWrapper';
import {ExpressReduxNextContext} from '../types';
import {CommonThunkDispatch, RootState} from '../../redux/types';

export const guestOnly = (
  Content: NextComponentType,
  options?: {useAdminLayout: boolean},
): ConnectedComponent<NextComponentType, any> => {
  class GuestWrapper extends React.Component<any, any> {
    public static async getInitialProps(context: ExpressReduxNextContext) {
      if (context.isServer) {
        const dispatch = context.store?.dispatch as CommonThunkDispatch<AnyAction>;
        const user = await dispatch(authRedux.getLoginUser());

        if (user) {
          context.res?.redirect('/');
          context.res?.end();
          return {};
        }
      } else {
        const user = selectors.getLoginUser(context.store?.getState());

        if (user) {
          Router.replace('/');
          return {};
        }
      }

      return Content.getInitialProps ? Content.getInitialProps(context) : {};
    }

    public render() {
      if (options && options.useAdminLayout) {
        return this._renderContentInsideAdminLayout();
      }

      return <Content {...this.props} />;
    }

    private _renderContentInsideAdminLayout = () => {
      return adminLayoutWrapper({children: <Content {...this.props} />});
    };
  }

  return composedHoc(GuestWrapper);
};

const mapStateToProps = (state: RootState) => ({
  currentUser: selectors.getLoginUser(state),
});

const composedHoc = compose(connect(mapStateToProps));
