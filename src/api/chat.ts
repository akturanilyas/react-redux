import { createApi } from '@reduxjs/toolkit/query/react';
import { BackendUrlConstant } from '../constants/backendUrlConstant';
import { ActionTypes } from '../enums/actionType';
import { baseQuery } from './api';
import { Chat, User } from './models';

export const chatApi = createApi({
  reducerPath: 'chat',
  baseQuery,
  tagTypes: ['Chat', 'User'],
  endpoints: (builder) => ({
    chats: builder.query<Chat, void>({
      query: () => ({
        url: BackendUrlConstant.GET_CHATS,
        method: ActionTypes.GET,
      }),
    }),
    chat: builder.query<User, number>({
      query: (id) => ({
        url: `${BackendUrlConstant.GET_CHATS}/${id}`,
        method: ActionTypes.GET,
      }),
    }),
  }),
});

export const { useChatsQuery, useChatQuery } = chatApi;
