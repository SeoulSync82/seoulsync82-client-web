import { checkTokenExpired, getAccessToken, setAccessToken } from '@/utils/auth';
import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export default class Service {
  public service: AxiosInstance;
  private isNeedAuthorization: boolean;

  constructor({
    baseURL = 'http://127.0.0.1:3456/api',
    // baseURL = 'http://sunggu.myqnapcloud.com:7008/api',
    isNeedAuthorization = true,
  }: { baseURL?: string; isNeedAuthorization?: boolean } = {}) {
    this.service = axios.create({
      baseURL,
      withCredentials: true,
    });
    this.service.interceptors.request.use(
      this.handleRequest.bind(this),
      Service.handleRequestError,
    );
    this.service.interceptors.response.use(Service.handleResponse, Service.handleResponseError);
    this.isNeedAuthorization = isNeedAuthorization;
  }

  private async handleRequest(config: InternalAxiosRequestConfig<any>) {
    if (this.isNeedAuthorization) {
      let token = getAccessToken();

      if (checkTokenExpired(token as string)) {
        try {
          const newToken = await this.silentTokenRefresh();
          setAccessToken(newToken as string);
          token = newToken;
        } catch (error) {
          window.location.href = '/login';
          console.log('token refresh failed: ', error);
          throw Error('token refresh error');
        }
      }

      token && (config.headers.Authorization = `Bearer ${token}`);
    }
    return config;
  }
  private static handleRequestError(error: any) {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
  private static handleResponse<T>(response: AxiosResponse<T>) {
    return response.data;
  }
  private static handleResponseError(error: any) {
    switch (error.response?.status) {
      case 401:
      case 403:
        window.location.href = '/login';
        break;
      case 404:
      case 500:
        // TODO: redirect to error page
        break;
      default:
        console.error('Response error:', error);
    }
    return Promise.reject(error);
  }

  private async silentTokenRefresh() {
    const response = await this.service.post('/user/refresh');
    return response.data.eid_access_token;
  }
}
