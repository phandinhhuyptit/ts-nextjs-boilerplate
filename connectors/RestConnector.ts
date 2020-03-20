import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import Cookies from 'js-cookie';

export class RestConnector {
  public jwt: string;
  private axios: AxiosInstance;

  constructor(baseUrl) {
    this.axios = axios.create({baseURL: baseUrl});
  }

  public get(url: string, config?: AxiosRequestConfig) {
    return this.axios.get(url, config);
  }

  public post(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.axios.post(url, data, config);
  }

  public patch(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.axios.patch(url, data, config);
  }

  public put(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.axios.put(url, data, config);
  }

  public delete(url: string, config?: AxiosRequestConfig) {
    return this.axios.delete(url, config);
  }

  public head(url: string, config?: AxiosRequestConfig) {
    return this.axios.head(url, config);
  }

  public options(url: string, config?: AxiosRequestConfig) {
    return this.axios.options(url, config);
  }

  public setAccessToken(token?: string) {
    if (token) {
      this.jwt = token;
      Cookies.set('jwt', token);
      this.axios.defaults.headers['Authorization'] = `Bearer ${token}`;
    } else {
      this.removeAccessToken();
    }
  }

  public removeAccessToken() {
    this.jwt = null;
    Cookies.remove('jwt');
    delete this.axios.defaults.headers['Authorization'];
  }
}
