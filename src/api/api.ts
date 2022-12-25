import axios, { Method } from 'axios';
import { BACKEND_URL_CONSTANT } from '../constants/backendUrlConstants';
import { ApiErrorUseCase } from '../constants/errors';
import { TOKEN, USER_ID } from '../constants/localStorageConstants';
import { ACTION_TYPE } from '../enums/actionType';
import { getHttpCodeErrorLabel, getHttpCodeErrorTitle } from '../helpers/errorHelper';

export interface ApiError {
  id?: string;
  errorLabel: string;
  errorTitle?: string;
  useCase: ApiErrorUseCase;
  statusCode: number;
}

export class BaseAxios {
  // Variables
  baseURL: string | undefined;

  headers: Record<string, string | number | boolean> | undefined;

  isAlreadyFetchingAccessToken: boolean | undefined;

  subscribers: Array<(accessToken: string) => void>;

  additionalSuffixParams: Record<string, unknown> | undefined | null;

  constructor({
    baseURL,
    headers,
    storageAuthKey,
    additionalSuffixParams,
  }: {
    baseURL?: string;
    headers?: Record<string, string | number | boolean>;
    storageAuthKey?: string;
    additionalSuffixParams?: Record<string, unknown>;
  }) {
    this.setBaseUrl(baseURL);
    this.setHeaders(headers);
    this.setAccessToken(storageAuthKey);
    this.additionalSuffixParams = additionalSuffixParams;
    this.setResponseInterceptors();

    // Default Values
    this.subscribers = [];
    this.isAlreadyFetchingAccessToken = false;
  }

  private setBaseUrl(_baseURL: string | undefined) {
    this.baseURL = _baseURL || process.env.REACT_APP_API_URL;
  }

  private setHeaders(_headers: Record<string, string | number | boolean> | undefined) {
    this.headers = _headers || {
      Accept: 'application/json',
    };
  }

  private onAccessTokenFetched(accessToken: string) {
    this.subscribers = this.subscribers.filter((callback: (accessToken: string) => void) => callback(accessToken));
  }

  private addSubscriber(callback: (access_token: string) => void) {
    this.subscribers.push(callback);
  }

  private clearSubscribers() {
    this.subscribers = [];
  }

  public async setAccessToken(storageAuthKey?: string) {
    const raw = await localStorage.getItem(storageAuthKey || TOKEN);

    const token = (raw?.length && raw) || null;

    token && (axios.defaults.headers.common.Authorization = token);
  }

  private async getUserId() {
    const userId = await localStorage.getItem(USER_ID);

    return userId;
  }

  private setResponseInterceptors() {
    axios.interceptors.response.use(
      (response) => response?.data || response,
      async (error) => {
        const errorResponse = error?.response;
        const originalRequest = error?.config;
        const errorStatusCode = errorResponse?.status;
        const errorMessage = errorResponse?.data?.message;

        const apiError: ApiError = {
          errorLabel: errorMessage,
          useCase: ApiErrorUseCase.SHOW_MESSAGE,
          statusCode: errorStatusCode,
        };

        if (errorStatusCode === 401) {
          const auth = await localStorage.getItem(TOKEN);

          if (originalRequest.url.indexOf(BACKEND_URL_CONSTANT.LOGOUT) > -1) {
            this.clearSubscribers();
            apiError.errorLabel = '';
            apiError.useCase = ApiErrorUseCase.NONE;

            return Promise.reject(apiError);
          }

          if (auth) {
            if (
              this.isAlreadyFetchingAccessToken &&
              originalRequest.url.indexOf(BACKEND_URL_CONSTANT.REFRESH_TOKEN) > -1
            ) {
              this.isAlreadyFetchingAccessToken = false;

              return Promise.reject(apiError);
            }
            if (!this.isAlreadyFetchingAccessToken) {
              this.isAlreadyFetchingAccessToken = true;
              const refreshToken = auth;

              try {
                const authValue = await this.start({
                  method: ACTION_TYPE.POST,
                  url: BACKEND_URL_CONSTANT.REFRESH_TOKEN,
                  body: null,
                  params: {
                    refresh_token: refreshToken,
                  },
                });

                await localStorage.setItem(TOKEN, authValue.data);
                await this.setAccessToken();
                this.onAccessTokenFetched(authValue.data.access_token);
                originalRequest.headers.Authorization = `Bearer ${authValue.data.access_token}`;
                this.isAlreadyFetchingAccessToken = false;

                return Promise.resolve(axios(originalRequest));
              } catch (error) {
                // Logout
                apiError.errorLabel = getHttpCodeErrorLabel(401);
                apiError.errorTitle = getHttpCodeErrorTitle(401);
                apiError.useCase = ApiErrorUseCase.LOGOUT;

                return Promise.reject(apiError);
              }
            }
            const retryOriginalRequest = new Promise((resolve) => {
              this.addSubscriber((accessToken) => {
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                resolve(axios(originalRequest));
              });
            });

            return Promise.resolve(retryOriginalRequest);
          }

          return Promise.reject(apiError);
        }

        // If the error is HTTP 404 and has not already been retried
        if (errorStatusCode === 404) {
          // 404 Flow
          apiError.errorLabel = errorMessage;
          apiError.errorTitle = getHttpCodeErrorTitle(404);
        }

        // If the error is HTTP 500 and has not already been retried
        if (errorStatusCode === 500) {
          apiError.errorLabel = getHttpCodeErrorLabel(500);
          apiError.errorTitle = getHttpCodeErrorTitle(500);
        }

        return Promise.reject(apiError);
      },
    );
  }

  public async start({
    method,
    url,
    body,
    params,
    rest,
  }: {
    method: Method;
    url: string;
    body?: Record<string, unknown> | string | null | unknown;
    params?: Record<string, unknown> | string | null | unknown;
    rest?: Record<string, unknown>;
  }) {
    await this.setAccessToken();
    const queryParams = typeof params === 'object' ? params : {};

    const axiosResponse = await axios({
      method,
      url,
      headers: this.headers,
      baseURL: this.baseURL,
      data: body,
      params: { ...queryParams },
      ...rest,
    });

    return axiosResponse;
  }
}
