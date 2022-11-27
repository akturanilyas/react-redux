import { createApi } from '@reduxjs/toolkit/query/react';
import { BackendUrlConstant } from '../constants/backendUrlConstant';
import { ActionTypes } from '../enums/actionType';
import { baseQuery } from './api';
import { Chat } from './models';

export const chatApi = createApi({
  reducerPath: 'chat',
  baseQuery,
  tagTypes: ['Chat'],
  endpoints: (builder) => ({
    chats: builder.query<Chat[], void>({
      query: () => ({
        url: BackendUrlConstant.GET_CHATS,
        method: ActionTypes.GET,
      }),
    }),
    chat: builder.query<Chat, number>({
      query: (id: number) => ({
        url: `${BackendUrlConstant.GET_CHATS}/${id}/messages`,
        method: ActionTypes.GET,
      }),
    }),
  }),
});

export const { useChatsQuery, useChatQuery } = chatApi;
