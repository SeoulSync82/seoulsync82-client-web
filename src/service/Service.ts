import axios, { AxiosInstance, AxiosResponse } from 'axios';
import queryString from 'query-string';

class Service {
  public service: AxiosInstance;
  private baseURL: string = '';
  private authorization: string | null = '';
  private cookie: string = '';

  constructor() {
    this.baseURL = `${process.env.BASE_URL_STG!}/api`;
    this.service = axios.create({
      baseURL: this.baseURL,
      withCredentials: true,
    });
    this.service.interceptors.request.use(
      Service.handleRequest.bind(this),
      Service.handleRequestError,
    );
    this.service.interceptors.response.use(Service.handleResponse, Service.handleResponseError);
  }

  private static async handleRequest(request: any) {
    // TODO: get token
    // this.authorization = localStorage.getItem('token');
    request.headers.Authorization = `Bearer ${this.authorization}`;
    return request;
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

  public get<T>(url: string, params?: unknown): Promise<T> {
    return this.service.get(url, {
      params,
      paramsSerializer: (params) => queryString.stringify(params),
    });
  }
  public post<T>(url: string, body?: unknown): Promise<T> {
    return this.service.post(url, body);
  }
  public put<T>(url: string, body?: unknown): Promise<T> {
    return this.service.put(url, body);
  }
  public delete<T>(url: string, params?: unknown): Promise<T> {
    return this.service.delete(url, {
      params,
      paramsSerializer: (params) => queryString.stringify(params),
    });
  }
  public patch<T>(url: string, body?: unknown): Promise<T> {
    return this.service.patch(url, body);
  }

  // chaining methods
  public setBaseUrl(url: string) {
    this.baseURL = url;
    this.service.defaults.baseURL = url;
    return this;
  }
  public setAuthorization(token: string | null) {
    this.authorization = token;
    this.service.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return this;
  }
  public setCookie(cookie: string) {
    this.cookie = cookie;
    this.service.defaults.headers.common['Cookie'] = cookie;
    return this;
  }
}

export default new Service();
