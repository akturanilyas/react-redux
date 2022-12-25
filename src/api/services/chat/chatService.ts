import { BACKEND_URL_CONSTANT, urlBuilder } from '../../../constants/backendUrlConstants';
import { ACTION_TYPE } from '../../../enums/actionType';
import { setChatId } from '../../../redux/slices/mainSlice';
import { Chat, ChatUser } from '../../../types/models';
import { Get } from '../../commonServiceInterface';
import { baseApi } from '../apiServices';
import { GET_CHAT_ID, getChatByUser } from './chatInterface';

export const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    chats: builder.query<Array<ChatUser>, void>({
      query: () => ({
        url: BACKEND_URL_CONSTANT.GET_CHATS,
        method: ACTION_TYPE.GET,
      }),
    }),
    chat: builder.query<Chat, number>({
      query: (id: number) => ({
        url: urlBuilder(BACKEND_URL_CONSTANT.GET_MESSAGES, { id }),
        method: ACTION_TYPE.GET,
      }),
    }),
    getUserChat: builder.mutation<Chat, getChatByUser>({
      query: ({ user_id }) => ({
        url: urlBuilder(BACKEND_URL_CONSTANT.GET_CHAT_BY_USER, { user_id }),
        method: ACTION_TYPE.GET,
      }),
    }),
    getChatId: builder.mutation<number, Get<GET_CHAT_ID>>({
      query: ({ query }) => ({
        url: BACKEND_URL_CONSTANT.GET_CHAT_ID,
        method: ACTION_TYPE.GET,
        data: { params: query },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled.then((response) => {
          const { data }: { data: number } = response;

          dispatch(setChatId(data));
        });
      },
    }),
  }),
});

export const { useChatQuery, useChatsQuery, useGetUserChatMutation, useGetChatIdMutation } = chatApi;
