import { getAccessToken } from '@/utils/auth';
import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

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
    this.service.interceptors.response.use(Service.handleResponse, Service.handleResponseError);
    this.isNeedAuthorization = isNeedAuthorization;
  }

  private handleRequest(config: InternalAxiosRequestConfig<any>) {
    if (this.isNeedAuthorization) {
      const accessToken = getAccessToken();
      accessToken && (config.headers.Authorization = 'Bearer ' + accessToken);
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
        break;
      case 403:
        break;
      case 404:
        break;
      case 500:
        break;
      default:
        console.error('Response error:', error);
    }
    return Promise.reject(error);
  }
}
