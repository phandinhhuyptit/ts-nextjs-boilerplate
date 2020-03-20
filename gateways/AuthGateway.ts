import _ from 'lodash';
import Cookies from 'js-cookie';
import {errorCode, ValidationError} from '../errors/ValidationError';
import {AuthService} from '../services/AuthService';
import {ApplicationError} from '../errors/ApplicationError';
import {RestConnector} from '../connectors/RestConnector';

export class AuthGateway {
  private restConnector: RestConnector;

  constructor(connector: {restConnector: RestConnector}) {
    this.restConnector = connector.restConnector;
  }

  public storeAccessToken(accessToken: string | null) {
    if (!accessToken) {
      Cookies.remove('jwt');
    } else {
      Cookies.set('jwt', accessToken);
    }
  }

  public async loginWithEmail(body: {email: string; password: string}) {
    const {data} = await this.restConnector.post('/accounts/login', body);
    return data;
  }

  public async create(body: {email: string; password: string}) {
    try {
      await this.restConnector.post('/accounts', body);
      return this.loginWithEmail(body);
    } catch (e) {
      switch (_.get(e, 'response.data.error.code')) {
        case 'USERNAME_EMAIL_REQUIRED':
        case 'LOGIN_FAILED': {
          throw new ApplicationError(AuthService.error.LOGIN_FAILED);
        }
        default: {
        }
      }
      if (_.get(e, 'response.data.error.message') === 'ACCOUNT_INACTIVATED') {
        throw new ApplicationError(AuthService.error.ACCOUNT_INACTIVATED);
      }
      throw e;
    }
  }

  public async getLoginUser() {
    if (!this.restConnector.jwt) {
      return null;
    }

    try {
      const resp = await this.restConnector.get('/accounts/me');
      return resp.data;
    } catch (e) {
      return null;
    }
  }

  public async logout() {
    try {
      await this.restConnector.post('/accounts/logout', {});
    } catch (e) {
      console.warn('Failed to call logout api, but cookie in browser will be cleared so user is still logged out', e);
    }
    this.restConnector.removeAccessToken();
  }

  public async sendResetPasswordEmail(email: string) {
    try {
      await this.restConnector.post('/accounts/reset', {email});
    } catch (e) {
      const errResp = _.get(e, 'response.data.error', e);
      switch (errResp.code) {
        case 'EMAIL_NOT_FOUND':
          throw new ApplicationError(AuthService.error.EMAIL_NOT_FOUND);
        case 'EMAIL_REQUIRED':
          throw new ValidationError({email: [errorCode.REQUIRED]});
        default:
          throw e;
      }
    }
  }

  public async updateAccountInfo(body: {name: string; email: string; preferredLanguage: string}) {
    try {
      await this.restConnector.patch(`/accounts/me`, body);
    } catch (e) {
      const errResp = _.get(e, 'response.data.error', e);
      switch (errResp.name) {
        case 'ValidationError': {
          if (_.get(errResp, 'details.codes.email[0]') === 'uniqueness') {
            throw new ValidationError({email: [errorCode.EMAIL_EXISTED]});
          }
          throw new ValidationError({email: [errorCode.INVALID_EMAIL]});
        }
        default: {
        }
      }
      throw e;
    }
  }

  public async updatePassword(body: {oldPassword: string; newPassword: string}) {
    try {
      await this.restConnector.post('/accounts/change-password', body);
    } catch (e) {
      console.log(e.response);
      const err = _.get(e, 'response.data.error', e);

      if (err.code === 'INVALID_PASSWORD' || err.message === 'oldPassword is a required argument') {
        throw new ApplicationError(AuthService.error.INVALID_CURRENT_PASSWORD);
      }

      throw err;
    }
  }

  public async setNewPassword(body: {userId: string; newPassword: string}, accessToken: string) {
    const {userId, newPassword} = body;
    try {
      await this.restConnector.post(`/accounts/reset-password?access_token=${accessToken}`, {id: userId, newPassword});
    } catch (e) {
      const err = _.get(e, 'response.data.error', e);

      switch (err.code) {
        case 'INVALID_PASSWORD':
          throw new ValidationError(AuthService.error.INVALID_CURRENT_PASSWORD);
        default:
          throw err;
      }
    }
  }

  public setAccessToken(accessToken: string) {
    this.restConnector.setAccessToken(accessToken);
  }

  public async forgotPassword(email: string) {
    return this.restConnector.post('/accounts/reset-password', {email});
  }

  public async changePassword(body: {newPassword: string; newPasswordConfirm: string}, accessToken: string) {
    const {newPassword, newPasswordConfirm} = body;
    this.restConnector.setAccessToken(accessToken);
    return this.restConnector.post(`/accounts/change-password?=${accessToken}`, {
      newPassword,
      newPasswordConfirm,
    });
  }
}
