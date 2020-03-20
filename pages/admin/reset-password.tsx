/* tslint:disable:no-default-export */
import React, {Component} from 'react';
import {withRouter} from 'next/router';
import Error from 'next/error';
import Head from 'next/head';
import toastr from 'toastr';
import classnames from 'classnames';
import {Formik, FormikActions} from 'formik';
import {guestOnly} from '../../hocs';
import {authService} from '../../services';
import {ExpressReduxNextContext} from '../../hocs/types';
import {WithRouterProps} from 'next/dist/client/with-router';
import {compose} from 'redux';

interface ResetPasswordForm {
  newPassword: string;
  confirmPassword: string;
  notMatch?: string;
}

interface ResetPasswordValidatorMessage {
  notMatch?: string;
}
interface Props {
  token: string;
}

class AdminResetPasswordPage extends Component<Props & WithRouterProps> {
  public static async getInitialProps(ctx: ExpressReduxNextContext) {
    const token = ctx.query.token;

    console.log({token});

    return {
      token,
    };
  }

  public render() {
    if (!this.props.token) {
      return <Error statusCode={400} />;
    }

    return (
      <div id="admin-login-page" className="align-items-center c-app flex-row pace-done">
        <Head>
          <title>Admin - Reset password</title>
        </Head>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-4">
              <div className="card-group">
                <div className="p-4 card">
                  <div className="card-body">
                    <Formik
                      initialValues={{
                        newPassword: '',
                        confirmPassword: '',
                      }}
                      onSubmit={this._handleResetPassword}
                      validate={(values) => {
                        const errors: ResetPasswordForm & ResetPasswordValidatorMessage = {
                          newPassword: '',
                          confirmPassword: '',
                        };
                        if (values.newPassword === '') {
                          errors.newPassword = 'New password is required';
                        } else if (values.confirmPassword === '') {
                          errors.confirmPassword = 'Confirm password is required';
                        } else if (values.confirmPassword !== values.newPassword) {
                          errors.notMatch = 'The passwords do not match';
                        }

                        return errors;
                      }}>
                      {(props) => (
                        <form onSubmit={props.handleSubmit}>
                          <h1>Reset Password</h1>
                          {/* <p className="text-muted">Sign In to your account</p> */}
                          <div className="form-group">
                            <div className="input-group mb-3">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="cil-lock-locked" />
                                </span>
                              </div>
                              <input
                                name="newPassword"
                                type="text"
                                placeholder="New Password"
                                onChange={props.handleChange}
                                value={props.values.newPassword}
                                className={classnames('form-control', {
                                  'is-invalid': props.errors.newPassword || props.errors.notMatch,
                                })}
                              />
                              {props.errors.newPassword && (
                                <div className="invalid-feedback">{props.errors.newPassword}</div>
                              )}
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="input-group mb-3">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="cil-lock-locked" />
                                </span>
                              </div>
                              <input
                                name="confirmPassword"
                                type="text"
                                placeholder="Confirm Password"
                                onChange={props.handleChange}
                                value={props.values.confirmPassword}
                                className={classnames('form-control', {
                                  'is-invalid': props.errors.confirmPassword || props.errors.notMatch,
                                })}
                              />
                              {props.errors.confirmPassword && (
                                <div className="invalid-feedback">{props.errors.confirmPassword}</div>
                              )}
                              {props.errors.notMatch && <div className="invalid-feedback">{props.errors.notMatch}</div>}
                            </div>
                          </div>
                          <div className="form-group">
                            <button className="btn btn-block btn-primary" type="submit" disabled={props.isSubmitting}>
                              {props.isSubmitting && <div className="spinner-border spinner-border-sm mr-1" />}
                              Submit
                            </button>
                          </div>
                        </form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  public _handleResetPassword = async (values: ResetPasswordForm, actions: FormikActions<ResetPasswordForm>) => {
    actions.setSubmitting(true);
    try {
      const accessToken = this.props.token;
      const body = {
        newPassword: values.newPassword,
        newPasswordConfirm: values.confirmPassword,
      };

      await authService.changePassword(body, accessToken);
      toastr.success('Success!');

      const {router} = this.props;
      await router.replace('/admin/login');
    } catch (e) {
      toastr.error(e.message);
    } finally {
      actions.setSubmitting(false);
    }
  };
}

export default compose(withRouter, guestOnly)(AdminResetPasswordPage, {useAdminLayout: true});
