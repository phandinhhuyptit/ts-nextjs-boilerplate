/* tslint:disable:no-default-export */
import React, {Component} from 'react';
import Head from 'next/head';
import {Formik, FormikActions} from 'formik';
import toastr from 'toastr';
import {adminOnly} from '../../../hocs';
// import { systemService } from '../../../services';
import {EmailFormat} from '../../../models/Configuration';

class AdminPasswordResetPage extends Component {
  public render() {
    const initialValues: EmailFormat = {
      senderName: '',
      senderEmail: '',
      subject: '',
      message: '',
    };

    return (
      <div id="admin-smtp-settings-page">
        <Head>
          <title>Admin - Configuration: Password Reset</title>
        </Head>
        <div className="row">
          <div className="col-12">
            <Formik initialValues={initialValues} onSubmit={this._handleSave}>
              {(props) => (
                <form onSubmit={props.handleSubmit}>
                  <div className="card">
                    <div className="card-header">
                      <strong>Password reset</strong>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-12">
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
                            <label>Subject</label>
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="cil-short-text" />
                                </span>
                              </div>
                              <input
                                className="form-control"
                                name="subject"
                                onChange={props.handleChange}
                                value={props.values.subject}
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Message</label>
                            <textarea
                              className="form-control"
                              name="message"
                              placeholder="Content ..."
                              onChange={props.handleChange}
                              value={props.values.message}></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <button className="btn btn-sm btn-primary" type="submit" disabled={props.isSubmitting}>
                        {props.isSubmitting && <div className="spinner-border spinner-border-sm mr-1" />}
                        Save
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

  //   _handleTestSmtpConnection = async (values: MailSmtpSettings) => {
  //     try {
  //       this.setState({ isTestingConnection: true });
  //       const isValid = await systemService.testSmtpConnection(values);

  //       if (isValid) {
  //         toastr.success('SMTP settings are valid');
  //       } else {
  //         toastr.error('Invalid SMTP settings');
  //       }
  //     } catch (e) {
  //       toastr.error(e.message);
  //     } finally {
  //       this.setState({ isTestingConnection: false });
  //     }
  //   };

  public _handleSave = async (values: EmailFormat, actions: FormikActions<EmailFormat>) => {
    actions.setSubmitting(true);
    try {
      // await systemService.saveSmtpSettings(values);
      console.log({values});

      toastr.success('Saved');
    } catch (e) {
      toastr.error(e.message);
    } finally {
      actions.setSubmitting(false);
    }
  };
}

export default adminOnly(AdminPasswordResetPage);
