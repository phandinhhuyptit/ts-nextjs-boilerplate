/* tslint:disable:no-default-export */
import React from 'react';
// import Router from 'next/router';
import Head from 'next/head';
import toastr from 'toastr';
import classnames from 'classnames';
import {Formik, FormikActions} from 'formik';
import {guestOnly} from '../../hocs';
import {authService} from '../../services';

interface ForgotPasswordForm {
  email: string;
}

interface State {
  isSendMail: boolean;
}

class AdminForgotPasswordPage extends React.Component<any, State> {
  public state: State = {
    isSendMail: false,
  };

  public render() {
    return (
      <div id="admin-forgot-password-page" className="align-items-center c-app flex-row pace-done">
        <Head>
          <title>Admin - Forgot password</title>
        </Head>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-5">
              <div className="card-group">
                <div className="card p-4">
                  <div className="card-body">
                    <Formik
                      initialValues={{
                        email: '',
                      }}
                      onSubmit={this._handleForgotPassword}
                      validate={(values) => {
                        const errors = {email: ''};
                        const regEmail = new RegExp(
                          '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@' +
                            '[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$',
                        );

                        if (!regEmail.test(values.email)) {
                          errors.email = 'Please enter the correct email format';
                        }

                        return errors;
                      }}>
                      {(props) => (
                        <form onSubmit={props.handleSubmit}>
                          <h1>Forgot password</h1>
                          {!this.state.isSendMail ? (
                            <div>
                              <p className="text-muted">
                                Don't worry! Enter your email below and we'll email you with instructions on how to
                                reset your password.
                              </p>
                              <div className="form-group">
                                <div className="input-group mb-3">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="cil-envelope-closed" />
                                    </span>
                                  </div>
                                  <input
                                    name="email"
                                    type="text"
                                    placeholder="Email"
                                    onChange={props.handleChange}
                                    value={props.values.email}
                                    className={classnames('form-control', {
                                      'is-invalid': props.errors.email,
                                    })}
                                  />
                                  {props.errors.email && <div className="invalid-feedback">{props.errors.email}</div>}
                                </div>
                              </div>
                              <div className="form-group">
                                <button
                                  className="btn btn-block btn-primary"
                                  type="submit"
                                  disabled={props.isSubmitting}>
                                  {props.isSubmitting && <div className="spinner-border spinner-border-sm mr-1" />}
                                  Request Password Reset
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="mt-3">
                              Thank you.
                              <br />
                              Please check your mailbox and follow the link to reset your password.
                            </div>
                          )}
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

  public _handleForgotPassword = async (values: ForgotPasswordForm, actions: FormikActions<ForgotPasswordForm>) => {
    actions.setSubmitting(true);
    try {
      await authService.forgotPassword(values.email);
      this.setState({isSendMail: true});
    } catch (e) {
      toastr.error(e.message);
    } finally {
      actions.setSubmitting(false);
    }
  };
}

export default guestOnly(AdminForgotPasswordPage, {useAdminLayout: true});
