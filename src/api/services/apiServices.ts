import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { Method } from 'axios';
import { ApiErrorUseCase } from '../../constants/errors';
import { TOKEN } from '../../constants/localStorageConstants';
import { ACTION_TYPE } from '../../enums/actionType';
import { decrease, increase } from '../../redux/slices/loadingSlice';
import { setUser } from '../../redux/slices/mainSlice';
import { ApiError, BaseAxios } from '../api';

export enum Tags {}

const Api = new BaseAxios({});

const apiErrorHandler = (error: ApiError, dispatch: ThunkDispatch<unknown, unknown, Action<unknown>>) => {
  const logout = () => {
    dispatch(setUser(undefined));
    localStorage.removeItem(TOKEN);
  };

  const pushError = () => {
    /*
        toast.error('Success Notification !', {
          position: toast.POSITION.TOP_RIGHT,
        });
         */
  };

  if (error) {
    switch (error.useCase) {
      case ApiErrorUseCase.LOGOUT:
        logout();
        // pushError();
        break;
      case ApiErrorUseCase.SHOW_MESSAGE:
        pushError();
        break;
      default:
        break;
    }
  }
};

interface RequestData {
  body?: Record<string, unknown> | unknown;
  params?: Record<string, unknown> | unknown;
}

export const apiBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method: ACTION_TYPE;
      data?: RequestData;
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data = {} }, { dispatch, endpoint }) => {
    try {
      dispatch(increase());
      const result = await Api.start({ method: method as Method, url, body: data?.body, params: data?.params });

      return { data: result?.data || result };
    } catch (error) {
      const apiError = error as ApiError;

      apiErrorHandler(apiError, dispatch);

      return {
        error: apiError,
      };
    } finally {
      dispatch(decrease());
    }
  };

export const baseApi = createApi({
  baseQuery: apiBaseQuery(),
  endpoints: () => ({}),
  tagTypes: Object.keys(Tags),
});
