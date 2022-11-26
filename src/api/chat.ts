import { createApi } from '@reduxjs/toolkit/query/react';
import { BackendUrlConstant } from '../constants/backendUrlConstant';
import { ActionTypes } from '../enums/actionType';
import { baseQuery } from './api';

export const chatApi = createApi({
  reducerPath: 'chat',
  baseQuery,
  tagTypes: ['chat'],
  endpoints: (builder) => ({
    chats: builder.query({
      query: () => ({
        url: BackendUrlConstant.GET_CHATS,
        method: ActionTypes.GET,
      }),
    }),
  }),
});

export const { useChatsQuery } = chatApi;
