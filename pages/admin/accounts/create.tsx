/* tslint:disable:no-default-export */
import React from 'react';
import Head from 'next/head';
import {NextComponentType, NextPageContext} from 'next';
import loGet from 'lodash/get';
import toastr from 'toastr';
import classNames from 'classnames';
import {adminOnly} from '../../../hocs';
import {Formik} from 'formik';
import {Account, AccountStatus} from '../../../models/User';
import {AccountEmailVerificationText, AccountStatusText, userFormValidationSchema} from '../../../view-models/User';
import {accountService} from '../../../services';

const initialValues: Account = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  status: AccountStatus.ACTIVE,
  emailVerified: true,
};

export function getServerErrorMessage(error) {
  const errorEnum = loGet(error, 'response.data.error.message');
  if (errorEnum === 'EMAIL_EXISTED') {
    return 'Email already existed';
  }
  return 'Unknown error';
}

function AdminAccountCreationPage() {
  async function _handleSave(values: Account, actions) {
    try {
      console.log(values);

      actions.setSubmitting(true);
      await accountService.createAccount(values);
      toastr.success('Success');
    } catch (e) {
      toastr.error(getServerErrorMessage(e));
    } finally {
      actions.setSubmitting(false);
    }
  }

  return (
    <div id="admin-create-account-page" className="shadow">
      <Head>
        <title>Admin - Create account</title>
      </Head>
      <Formik initialValues={initialValues} onSubmit={_handleSave} validationSchema={userFormValidationSchema}>
        {({errors, handleChange, handleSubmit, values, isSubmitting, setFieldValue}) => (
          <form onSubmit={handleSubmit}>
            <div className="card">
              <div className="card-header">
                <strong>Create account</strong>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <label>Email</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="cil-envelope-closed" />
                          </span>
                        </div>
                        <input
                          className={classNames('form-control', {'is-invalid': errors.email})}
                          name="email"
                          onChange={handleChange}
                          value={values.email}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Password</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="cil-lock-locked" />
                          </span>
                        </div>
                        <input
                          className={classNames('form-control', {'is-invalid': errors.password})}
                          name="password"
                          type="password"
                          onChange={handleChange}
                          value={values.password}
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                      </div>
                    </div>
                    <div className="form-group">
                      <label>First name</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="cil-user" />
                          </span>
                        </div>
                        <input
                          name="firstName"
                          className={classNames('form-control', {'is-invalid': errors.firstName})}
                          onChange={handleChange}
                          value={values.firstName}
                        />
                        {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Last name</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="cil-user" />
                          </span>
                        </div>
                        <input
                          name="lastName"
                          className={classNames('form-control', {'is-invalid': errors.lastName})}
                          onChange={handleChange}
                          value={values.lastName}
                        />
                        {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Account status</label>
                      <select name="status" className="form-control" value={values.status} onChange={handleChange}>
                        <option value={AccountStatus.ACTIVE}>{AccountStatusText[AccountStatus.ACTIVE]}</option>
                        <option value={AccountStatus.INACTIVE}>{AccountStatusText[AccountStatus.INACTIVE]}</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Email verification</label>
                      <select
                        name="emailVerified"
                        className="form-control"
                        value={String(values.emailVerified)}
                        onChange={(e) => {
                          if (e.target.value === 'true') setFieldValue('emailVerified', true);
                          else setFieldValue('emailVerified', false);
                        }}>
                        <option value="true">{AccountEmailVerificationText.VERIFIED}</option>
                        <option value="false">{AccountEmailVerificationText.NOT_VERIFIED}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <button className="btn btn-sm btn-success" type="submit" disabled={isSubmitting}>
                  {isSubmitting && <div className="spinner-border spinner-border-sm mr-1" role="status" />}
                  {isSubmitting ? 'Creating...' : 'Create'}
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default adminOnly(AdminAccountCreationPage as NextComponentType<NextPageContext, any, any>);
