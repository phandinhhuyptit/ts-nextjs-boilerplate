import React from 'react';
import {AnyAction} from 'redux';
import Link from 'next/link';
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from 'reactstrap';
import {NextComponentType} from 'next';
import {withRouter} from 'next/router';
import {WithRouterProps} from 'next/dist/client/with-router';
import {ExpressReduxNextContext} from './types';
import {authService} from '../services';
import {CommonThunkDispatch} from '../redux/types';
import {actions as authRedux} from '../redux/authRedux';
import {isAdmin} from '../models/User';
import '../scss/admin/index.scss';

/* tslint:disable-next-line:variable-name */
export const adminOnly = (Content: NextComponentType): NextComponentType => {
  class AdminWrapper extends React.Component<WithRouterProps> {
    public static async getInitialProps(ctx: ExpressReduxNextContext) {
      const {req, res, isServer} = ctx;
      const dispatch = ctx.store?.dispatch as CommonThunkDispatch<AnyAction>;

      if (isServer) {
        authService.setAccessToken(req?.cookies?.jwt);
        const user = await dispatch(authRedux.getLoginUser());

        if (!user) {
          res.redirect('/admin/login');
          res.end();
        } else if (!isAdmin(user)) {
          res.redirect('/');
          res.end();
        }
      }

      return Content.getInitialProps ? Content.getInitialProps(ctx) : {};
    }

    public render() {
      return (
        <div className="c-app pace-done">
          {this._renderSidebar()}
          <div className="c-wrapper">
            {this._renderNavbar()}
            <div className="c-body">
              <main className="c-main">
                <div className="container-fluid">
                  <Content {...this.props} />
                </div>
              </main>
            </div>
          </div>
        </div>
      );
    }

    public _renderNavbar = () => {
      return (
        <header className="c-header c-header-light c-header-fixed px-3">
          <button className="c-header-toggler c-class-toggler d-md-down-none" type="button">
            <span className="c-header-toggler-icon" />
          </button>
          <ul className="c-header-nav mfs-auto">
            <li className="c-header-nav-item dropdown">
              <div
                className="c-header-nav-link"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false">
                <UncontrolledDropdown>
                  <DropdownToggle nav>
                    <div className="c-avatar">
                      <img
                        className="c-avatar-img"
                        src="https://coreui.io/demo/3.0-beta.0/assets/img/avatars/6.jpg"
                        alt="user@email.com"
                      />
                    </div>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>Profile</DropdownItem>
                    <DropdownItem onClick={this._logout}>Logout</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            </li>
          </ul>
        </header>
      );
    };

    public _renderSidebar = () => {
      return (
        <div className="c-sidebar c-sidebar-dark c-sidebar-fixed c-sidebar-lg-show" id="sidebar">
          <div className="c-sidebar-brand">ADMIN PORTAL</div>
          <ul className="c-sidebar-nav ps ps--active-y" data-drodpown-accordion="true">
            <li className="c-sidebar-nav-item">
              <Link href="/admin">
                <a className="c-sidebar-nav-link">
                  <i className="c-sidebar-nav-icon cil-speedometer" />
                  Dashboard
                </a>
              </Link>
            </li>
            <li className="c-sidebar-nav-item">
              <Link href="/admin/accounts">
                <a className="c-sidebar-nav-link">
                  <i className="c-sidebar-nav-icon cil-speedometer" />
                  Accounts
                </a>
              </Link>
            </li>
            <li className="c-sidebar-nav-title">EMAIL</li>
            <li className="c-sidebar-nav-item">
              <Link href="/admin/configurations/smtp-settings">
                <a className="c-sidebar-nav-link">
                  <i className="c-sidebar-nav-icon cil-settings" />
                  SMTP settings
                </a>
              </Link>
              <Link href="/admin/configurations/email-address-verification">
                <a className="c-sidebar-nav-link">
                  <i className="c-sidebar-nav-icon cil-send" />
                  Email address verification
                </a>
              </Link>
              <Link href="/admin/configurations/password-reset">
                <a className="c-sidebar-nav-link">
                  <i className="c-sidebar-nav-icon cil-send" />
                  Password reset
                </a>
              </Link>
            </li>
          </ul>
          <button
            className="c-sidebar-minimizer c-class-toggler"
            type="button"
            data-target="_parent"
            data-class="c-sidebar-unfoldable"
          />
        </div>
      );
    };

    public _logout = async () => {
      const {router} = this.props;
      try {
        await authService.logout();
        await router.replace('/admin/login');
      } catch (e) {
        toastr.error(e.message);
      }
    };
  }

  return withRouter(AdminWrapper);
};
