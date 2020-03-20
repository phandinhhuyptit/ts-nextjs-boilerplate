import {ConfigurationKey} from '../models/Configuration';
import {RestConnector} from '../connectors/RestConnector';

export interface SystemStatusData {
  status: string;
}

export interface MailSmtpSettings {
  password: string;
  smtpHost: string;
  username: string;
  smtpPort: string;
  senderEmail: string;
  senderName: string;
}

export interface ResetPasswordSettings {
  emailTemplate: string;
  subject: string;
  senderEmail: string;
  senderName: string;
}

export interface VerifyAccountSetting {
  emailTemplate: string;
  subject: string;
  senderEmail: string;
  senderName: string;
}

export type ConfigurationData = SystemStatusData | MailSmtpSettings | ResetPasswordSettings | VerifyAccountSetting;

export interface ConfigurationModel {
  id: string;
  data: ConfigurationData;
}

export class SystemGateway {
  private restConnector: RestConnector;

  constructor({restConnector}: {restConnector: RestConnector}) {
    this.restConnector = restConnector;
  }

  public async initSystem(body: {
    password: string;
    admin: {
      email: string;
      password: string;
    };
  }): Promise<boolean> {
    const {data} = await this.restConnector.post(`/configurations/initialize-system`, body);
    return data.success;
  }

  public async validateSystemInitializationPassword(password: string): Promise<boolean> {
    const {data} = await this.restConnector.post('/configurations/validate-system-initialization-password', {password});
    return data.isValid;
  }

  public async updateSystemConfiguration(id: ConfigurationKey, data: ConfigurationData) {
    const resp = await this.restConnector.put(`/configurations/${id}`, {
      id,
      data,
    });

    return resp.data;
  }

  public async getConfiguration(id: ConfigurationKey): Promise<ConfigurationModel | null> {
    try {
      const resp = await this.restConnector.get(`/configurations/${id}`);
      return resp.data;
    } catch (e) {
      // If data is not exist, return null rather than throwing error.
      if (e.response.status === 404) {
        return null;
      }

      throw e;
    }
  }
}
