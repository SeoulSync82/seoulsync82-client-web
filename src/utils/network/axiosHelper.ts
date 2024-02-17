import axios, { Axios, AxiosResponse } from 'axios';
import queryString from 'query-string';

const AxiosHelper = () => {
  let _baseUrl = '';
  let _authorization: string | null = '';
  let _cookie = '';
  let _instance: Axios;

  // 함수 체이닝 사용
  const setBaseUrl = (url: string) => {
    _baseUrl = url;
    return apiFunctions;
  };

  const setAuthorization = (token: string | null) => {
    _authorization = token;
    return apiFunctions;
  };

  const setCookie = (cookie: string) => {
    _cookie = cookie;
    return apiFunctions;
  };

  const build = () => {
    _instance = axios.create({
      baseURL: _baseUrl,
      withCredentials: true,
      headers: {
        common: {
          Authorization: `Bearer ${_authorization}`,
          Cookie: _cookie,
        },
      },
    });

    return apiFunctions;
  };

  const get = async (url: string, params?: unknown): Promise<AxiosResponse> => {
    try {
      const { data, status } = await _instance.get(url, {
        params,
        paramsSerializer: (params) => {
          return queryString.stringify(params);
        },
      });

      if (status === 500) {
        throw data;
      }

      return data;
    } catch (e) {
      throw axiosError(e);
    }
  };

  const post = async (url: string, params?: unknown): Promise<AxiosResponse> => {
    try {
      const { data, status } = await _instance.post(url, params);

      if (status === 500) {
        throw data;
      }

      return data;
    } catch (e) {
      throw axiosError(e);
    }
  };

  const put = async (url: string, params?: unknown): Promise<AxiosResponse> => {
    try {
      const { data, status } = await _instance.put(url, params);

      if (status === 500) {
        throw data;
      }

      return data;
    } catch (e) {
      throw axiosError(e);
    }
  };

  const del = async (url: string, params?: unknown): Promise<AxiosResponse> => {
    try {
      const { data, status } = await _instance.delete(url, {
        params,
        paramsSerializer: (params) => {
          return queryString.stringify(params);
        },
      });

      if (status === 500) {
        throw data;
      }

      return data;
    } catch (e) {
      throw axiosError(e);
    }
  };

  const patch = async (url: string, params?: unknown): Promise<AxiosResponse> => {
    try {
      const { data, status } = await _instance.patch(url, params);

      if (status === 500) {
        throw data;
      }

      return data;
    } catch (e) {
      throw axiosError(e);
    }
  };

  const axiosError = (error: any) => {
    const { response } = error;

    const { data, status } = response;

    if (status === 500) {
      location.href = '/error/500';
    }
    throw data;
  };

  const apiFunctions = {
    setBaseUrl,
    setAuthorization,
    setCookie,
    build,
    get,
    post,
    put,
    del,
    patch,
  };

  return apiFunctions;
};

export default AxiosHelper;
