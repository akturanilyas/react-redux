import axios, { AxiosResponse, Method } from 'axios';
import SimpleSnackbar from '../components/snackbar/snackbar';

type IBody = object | string | null;
let headers: object = {};
let baseURL: string = '';

export class ApiService {
  response: AxiosResponse | undefined;

  constructor() {
    this.setBaseUrl();
    this.setHeaders();
    this.setAccessToken();
    this.setResponseInterceptors();
  }

  private setBaseUrl = () => {
    baseURL = `${process.env.REACT_APP_BACKEND_URL}/api`;
  };

  private setHeaders() {
    headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    };
  }

  public setAccessToken() {
    const token = localStorage.getItem('access_token');

    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  private setResponseInterceptors = () => {
    // Add a request interceptor
    axios.interceptors.request.use(
      (config) => {
        // Do something before request is sent
        return config;
      },
      (error) => {
        // Do something with request error
        return Promise.reject(error);
      },
    );

    // Add a response interceptor
    axios.interceptors.response.use(
      (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      },
      (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error

        SimpleSnackbar();

        return Promise.reject(error);
      },
    );
  };

  public async start(method: Method, url: string, body?: IBody, params?: any) {
    this.response = await axios({
      method,
      url,
      headers,
      baseURL,
      data: body,
      params,
    });

    return this.response;
  }
}
