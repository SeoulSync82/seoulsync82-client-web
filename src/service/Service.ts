import { checkTokenExpired, getAccessToken, removeAccessToken, setAccessToken } from '@/utils/auth';
import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export default class Service {
  public service: AxiosInstance;
  private isNeedAuthorization: boolean;

  constructor({
    baseURL = 'http://sunggu.myqnapcloud.com:7008/api',
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
    this.service.interceptors.response.use(
      Service.handleResponse,
      this.handleResponseError.bind(this),
    );
    this.isNeedAuthorization = isNeedAuthorization;
  }

  private async handleRequest(config: InternalAxiosRequestConfig<any>) {
    if (this.isNeedAuthorization) {
      const token = getAccessToken();
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
  private async handleResponseError(error: any) {
    switch (error.response?.status) {
      case 401: {
        let token = getAccessToken();
        if (!token || checkTokenExpired(token)) {
          try {
            const response = await this.silentTokenRefresh();
            token = response.data.eid_access_token;
            setAccessToken(token as string);
            this.service.defaults.headers.Authorization = `Bearer ${token}`;
          } catch (refreshError) {
            removeAccessToken();
            window.location.href = '/login';
          }
        }
        break;
      }
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
    return await this.service.post('/user/refresh');
  }
}
