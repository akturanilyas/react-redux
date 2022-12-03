import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';
import { BackendUrlConstant, urlBuilder } from '../constants/backendUrlConstant';
import { ActionTypes } from '../enums/actionType';
import { baseQuery } from './api';
import { Message } from './models';

export type Channel = 'redux' | 'general';

const messagesAdapter = createEntityAdapter<Message>();

export const messageApi = createApi({
  reducerPath: 'messageApi',
  baseQuery,
  tagTypes: ['message'],
  endpoints: (builder) => ({
    messages: builder.mutation<Message[], number>({
      query: (chatId: number) => ({
        url: urlBuilder(BackendUrlConstant.GET_MESSAGES, { chatId }),
        method: ActionTypes.GET,
      }),
    }),
    getMessages: builder.query<EntityState<Message>, Channel>({
      query: (channel) => `messages/${channel}`,
      transformResponse(response: Message[]) {
        return messagesAdapter.addMany(messagesAdapter.getInitialState(), response);
      },
      async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        const ws = new WebSocket('ws://localhost:8080');
        try {
          await cacheDataLoaded;

          const listener = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            if (data.channel !== arg) return;

            updateCachedData((draft) => {
              messagesAdapter.upsertOne(draft, data);
            });
          };

          ws.addEventListener('message', listener);
        } catch (e) {
          console.log(e);
        }
        await cacheEntryRemoved;
        ws.close();
      },
    }),
  }),
});

export const { useMessagesMutation } = messageApi;
