import { createApi } from '@reduxjs/toolkit/query/react';
import { BackendUrlConstant, urlBuilder } from '../constants/backendUrlConstant';
import { ActionTypes } from '../enums/actionType';
import { baseQuery } from './api';
import { Message } from './models';

export const messageApi = createApi({
  reducerPath: 'message',
  baseQuery,
  tagTypes: ['message'],
  endpoints: (builder) => ({
    messages: builder.mutation<Message[], number>({
      query: (chatId: number) => ({
        url: urlBuilder(BackendUrlConstant.GET_MESSAGES, { chatId }),
        method: ActionTypes.GET,
      }),
    }),
  }),
});

export const { useMessagesMutation } = messageApi;
