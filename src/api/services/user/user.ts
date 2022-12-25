import { BACKEND_URL_CONSTANT } from '../../../constants/backendUrlConstants';
import { ACTION_TYPE } from '../../../enums/actionType';
import { baseApi } from '../apiServices';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    chatUsers: builder.query({
      query: () => ({
        url: BACKEND_URL_CONSTANT.GET_CHAT_USERS,
        method: ACTION_TYPE.GET,
      }),
    }),
  }),
});

export const { useChatUsersQuery } = userApi;
