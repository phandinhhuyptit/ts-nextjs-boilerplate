/* tslint:disable:no-default-export */
import React, {Component} from 'react';
import Head from 'next/head';
import {Formik, FormikActions} from 'formik';
import toastr from 'toastr';
import {NextComponentType, NextPageContext} from 'next';
import {adminOnly} from '../../../hocs';
import {systemService} from '../../../services';
import {MailSmtpSettings} from '../../../models/Configuration';

class AdminSmtpSettingsPage extends Component<{initialSmtpSettings: MailSmtpSettings}> {
  public state = {
    isTestingConnection: false,
  };

  public static async getInitialProps() {
    const initialSmtpSettings = await systemService.getSmtpSettings();
    return {
      initialSmtpSettings,
    };
  }

  public render() {
    const initialValues: MailSmtpSettings = this.props.initialSmtpSettings || {
      smtpHost: '',
      smtpPort: '',
      username: '',
      password: '',
      senderEmail: '',
      senderName: '',
    };
    const {isTestingConnection} = this.state;

    return (
      <div id="admin-smtp-settings-page">
        <Head>
          <title>Admin - Configuration: SMTP settings</title>
        </Head>
        <div className="row">
          <div className="col-12">
            <Formik initialValues={initialValues} onSubmit={this._handleSave}>
              {(props) => (
                <form onSubmit={props.handleSubmit}>
                  <div className="card">
                    <div className="card-header">
                      <strong>SMTP settings</strong>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-12">
                          <div className="form-group">
                            <label>SMTP server host</label>
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="cil-cast" />
                                </span>
                              </div>
                              <input
                                className="form-control"
                                name="smtpHost"
                                onChange={props.handleChange}
                                value={props.values.smtpHost}
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label>SMTP server port</label>
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="cil-lan" />
                                </span>
                              </div>
                              <input
                                className="form-control"
                                name="smtpPort"
                                onChange={props.handleChange}
                                value={props.values.smtpPort}
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Sender name</label>
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="cil-user" />
                                </span>
                              </div>
                              <input
                                className="form-control"
                                name="senderName"
                                onChange={props.handleChange}
                                value={props.values.senderName}
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Sender email</label>
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="cil-envelope-closed" />
                                </span>
                              </div>
                              <input
                                className="form-control"
                                name="senderEmail"
                                onChange={props.handleChange}
                                value={props.values.senderEmail}
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label>SMTP account username</label>
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="cil-user" />
                                </span>
                              </div>
                              <input
                                className="form-control"
                                name="username"
                                onChange={props.handleChange}
                                value={props.values.username}
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label>SMTP account password</label>
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="cil-lock-locked" />
                                </span>
                              </div>
                              <input
                                className="form-control"
                                name="password"
                                onChange={props.handleChange}
                                value={props.values.password}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <button className="btn btn-sm btn-primary" type="submit" disabled={props.isSubmitting}>
                        {props.isSubmitting && <div className="spinner-border spinner-border-sm mr-1" />}
                        Save
                      </button>
                      &nbsp;
                      <button
                        className="btn btn-sm btn-info"
                        onClick={async (e) => {
                          e.preventDefault();
                          await this._handleTestSmtpConnection(props.values);
                        }}
                        disabled={isTestingConnection}>
                        {isTestingConnection && <div className="spinner-border spinner-border-sm mr-1" />}
                        Test connection
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    );
  }

  public _handleTestSmtpConnection = async (values: MailSmtpSettings) => {
    try {
      this.setState({isTestingConnection: true});
      const isValid = await systemService.testSmtpConnection(values);

      if (isValid) {
        toastr.success('SMTP settings are valid');
      } else {
        toastr.error('Invalid SMTP settings');
      }
    } catch (e) {
      toastr.error(e.message);
    } finally {
      this.setState({isTestingConnection: false});
    }
  };

  public _handleSave = async (values: MailSmtpSettings, actions: FormikActions<MailSmtpSettings>) => {
    try {
      actions.setSubmitting(true);
      await systemService.saveSmtpSettings(values);
      toastr.success('Saved');
    } catch (e) {
      toastr.error(e.message);
    } finally {
      actions.setSubmitting(false);
    }
  };
}

export default adminOnly(AdminSmtpSettingsPage as NextComponentType<NextPageContext, any, any>);
