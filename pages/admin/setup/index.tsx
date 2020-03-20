/* tslint:disable:no-default-export */
import React, {Component} from 'react';
import Head from 'next/head';
import {guestOnly} from '../../../hocs';
import EnterPasswordForm from './EnterPasswordForm';
import CreateFirstAdminForm from './CreateFirstAdminForm';

const STEP = {
  ENTER_PASSWORD: 'enter-password',
  CREATE_FIRST_ADMIN: 'create-first-admin',
};

class AdminSetupPage extends Component {
  public state = {
    step: STEP.ENTER_PASSWORD,
    correctSystemInitPassword: null,
  };

  public render() {
    return (
      <div className="align-items-center c-app flex-row pace-done">
        <Head>
          <title>Admin - Setup</title>
        </Head>
        <div className="container">
          <div className="justify-content-center row">
            <div className="col-md-6">
              <div className="p-4 card">
                <div className="card-body">
                  {this.state.step === STEP.CREATE_FIRST_ADMIN ? (
                    <CreateFirstAdminForm correctSystemInitPassword={this.state.correctSystemInitPassword || ''} />
                  ) : (
                    <EnterPasswordForm
                      onSuccess={(correctPassword) =>
                        this.setState({
                          step: STEP.CREATE_FIRST_ADMIN,
                          correctSystemInitPassword: correctPassword,
                        })
                      }
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default guestOnly(AdminSetupPage, {useAdminLayout: true});
