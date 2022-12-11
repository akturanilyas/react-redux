import { createApi } from '@reduxjs/toolkit/query/react';
import { BackendUrlConstant, urlBuilder } from '../constants/backendUrlConstant';
import { ActionTypes } from '../enums/actionType';
import { ChatEvent } from '../enums/chatEvent';
import { getSocket } from '../services/socketService';
import { baseQuery } from './api';
import { Message } from './models';

export type Channel = 'redux' | 'general';

export const messageApi = createApi({
  reducerPath: 'messageApi',
  baseQuery,
  tagTypes: ['message'],
  endpoints: (builder) => ({
    messages: builder.mutation<Message[], number>({
      query: (chatId: number) => ({
        url: urlBuilder(BackendUrlConstant.GET_MESSAGES, { chat_id: chatId }),
        method: ActionTypes.GET,
      }),
    }),
    sendMessage: builder.mutation<Message, any>({
      queryFn: async ({ targetId, targetType, text }) => {
        const socket = await getSocket();

        return new Promise((resolve) => {
          socket.emit(ChatEvent.SEND_MESSAGE, { targetId, targetType, text }, (message: Message) => {
            resolve({ data: message });
          });
        });
      },
    }),
  }),
});

export const { useMessagesMutation, useSendMessageMutation } = messageApi;
