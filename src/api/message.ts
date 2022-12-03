import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';
import { io, Socket } from 'socket.io-client';
import { BackendUrlConstant, urlBuilder } from '../constants/backendUrlConstant';
import { ActionTypes } from '../enums/actionType';
import { ChatEvent } from '../enums/chatEvent';
import { baseQuery } from './api';
import { Message } from './models';

export type Channel = 'redux' | 'general';

const messagesAdapter = createEntityAdapter<Message>();

let socket: Socket;

function getSocket() {
  if (!socket) {
    socket = io(process.env.REACT_APP_API_URL as string, {
      withCredentials: true,
     transports: ['websocket'],
    });
  }

  return socket;
}

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
        const ws = new WebSocket(process.env.REACT_APP_API_URL as string);
        try {
          await cacheDataLoaded;

          const listener = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            if (data.channel !== arg) return;
            console.log(data);
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
    sendMessage: builder.mutation<Message, string>({
      queryFn: (chatMessageContent: string) => {
        const socket = getSocket();

        return new Promise((resolve) => {
          socket.emit(ChatEvent.SEND_MESSAGE, chatMessageContent, (message: Message) => {
            resolve({ data: message });
          });
        });
      },
    }),
  }),
});

export const { useMessagesMutation, useSendMessageMutation } = messageApi;
