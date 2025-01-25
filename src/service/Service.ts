import { getAccessToken } from '@/utils/auth';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import queryString from 'query-string';

class Service {
  service: AxiosInstance;

  constructor({ baseURL = `http://sunggu.myqnapcloud.com:7008/api` }: { baseURL?: string } = {}) {
    this.service = axios.create({
      baseURL,
      withCredentials: true,
    });
    this.service.interceptors.request.use(
      this.handleRequest.bind(this),
      Service.handleRequestError,
    );
    this.service.interceptors.response.use(Service.handleResponse, Service.handleResponseError);
  }

  private handleRequest(request: any) {
    // const accessToken = getAccessToken();
    const accessToken = import.meta.env.VITE_TEMP_TOKEN;
    accessToken && (request.headers.Authorization = 'Bearer ' + accessToken);
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

  // TODO: 필요시 주석 해제
  // public setBaseUrl(url: string) {
  //   this.service.defaults.baseURL = url;
  //   return this;
  // }
  // public setAuthorization(token: string | null) {
  //   this.service.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  //   return this;
  // }
  // public setCookie(cookie: string) {
  //   this.cookie = cookie;
  //   this.service.defaults.headers.common['Cookie'] = cookie;
  //   return this;
  // }
}

export default new Service();
