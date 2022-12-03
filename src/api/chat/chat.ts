import { createApi } from '@reduxjs/toolkit/query/react';
import { BackendUrlConstant, urlBuilder } from '../../constants/backendUrlConstant';
import { ActionTypes } from '../../enums/actionType';
import { baseQuery } from '../api';
import { getChatByUser } from './chatInterface';
import { Chat } from '../models';

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
        url: urlBuilder(BackendUrlConstant.GET_MESSAGES, { id }),
        method: ActionTypes.GET,
      }),
    }),
    getUserChat: builder.mutation<Chat, getChatByUser>({
      query: ({ user_id }) => ({
        url: urlBuilder(BackendUrlConstant.GET_CHAT_BY_USER, { user_id }),
        method: ActionTypes.GET,
      }),
    }),
  }),
});

export const { useChatsQuery, useChatQuery, useGetUserChatMutation } = chatApi;
