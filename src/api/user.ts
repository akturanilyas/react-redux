import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './api';
import { BackendUrlConstant } from '../constants/backendUrlConstant';
import { ActionTypes } from '../enums/actionType';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery,
  tagTypes: ['user'],
  endpoints: (builder) => ({
    chatUsers: builder.query({
      query: () => ({
        url: BackendUrlConstant.GET_CHAT_USERS,
        method: ActionTypes.GET,
      }),
    }),
  }),
});

export const { useChatUsersQuery } = userApi;
