import { BACKEND_URL_CONSTANT } from '../../../constants/backendUrlConstants';
import { TOKEN, USER_ID } from '../../../constants/localStorageConstants';
import { ACTION_TYPE } from '../../../enums/actionType';
import { setUser } from '../../../redux/slices/mainSlice';
import { Auth, User } from '../../../types/models';
import { Post } from '../../commonServiceInterface';
import { baseApi } from '../apiServices';
import { LoginBodyRequest, RegisterBodyRequest } from './authInterface';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<Auth, Post<LoginBodyRequest>>({
      query: ({ body }) => ({ url: BACKEND_URL_CONSTANT.LOGIN, method: ACTION_TYPE.POST, data: { body } }),
      async onQueryStarted(_, { queryFulfilled }) {
        queryFulfilled.then((response) => {
          debugger;
          const { data }: { data: Auth } = response;
          localStorage.setItem(TOKEN, data.token);
        });
      },
    }),
    register: builder.mutation<Auth, Post<RegisterBodyRequest>>({
      query: ({ body }) => ({ url: BACKEND_URL_CONSTANT.REGISTER, method: ACTION_TYPE.POST, data: { body } }),
    }),
    self: builder.query<User, void>({
      query: () => ({ url: BACKEND_URL_CONSTANT.ME, method: ACTION_TYPE.GET }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled.then((response) => {
          const { data }: { data: User } = response;

          localStorage.setItem(USER_ID, JSON.stringify(data.id));
          dispatch(setUser(data));
        });
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLazySelfQuery } = authApi;
