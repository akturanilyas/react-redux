import { createApi } from '@reduxjs/toolkit/query/react';
import { BackendUrlConstant, urlBuilder } from '../../constants/backendUrlConstant';
import { ActionTypes } from '../../enums/actionType';
import { baseQuery } from '../api';
import { Chat, ChatUser } from '../models';
import { getChatByUser, getChatId } from './chatInterface';

export const chatApi = createApi({
  reducerPath: 'chat',
  baseQuery,
  tagTypes: ['Chat'],
  endpoints: (builder) => ({
    chats: builder.query<ChatUser[], void>({
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
    getChatId: builder.mutation<number, getChatId>({
      query: ({ target_id, target_type }) => ({
        url: BackendUrlConstant.GET_CHAT_ID,
        method: ActionTypes.GET,
        params: { target_id, target_type },
      }),
    }),
  }),
});

export const { useChatsQuery, useChatQuery, useGetChatIdMutation, useGetUserChatMutation } = chatApi;
