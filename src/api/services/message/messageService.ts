import { BACKEND_URL_CONSTANT, urlBuilder } from '../../../constants/backendUrlConstant';
import { ACTION_TYPE } from '../../../enums/actionType';
import { Message } from '../../../types/models';
import { baseApi } from '../apiServices';

export const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    messages: builder.query<Message[], number>({
      query: (chatId: number) => ({
        url: urlBuilder(BACKEND_URL_CONSTANT.GET_MESSAGES, { chat_id: chatId }),
        method: ACTION_TYPE.GET,
      }),
    }),
  }),
});

export const { useLazyMessagesQuery } = messageApi;
