import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BackendUrlConstant } from '../constants/backendUrlConstant';
import { ActionTypes } from '../enums/actionType';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BACKEND_URL }),
  tagTypes: ['user'],
  endpoints: (builder) => ({
    getChatUsers: builder.mutation({
      query: () => ({
        url: BackendUrlConstant.GET_CHAT_USERS,
        method: ActionTypes.GET,
      }),
    }),
  }),
});

export const { useGetChatUsersMutation } = userApi;
