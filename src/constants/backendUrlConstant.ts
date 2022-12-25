export const BACKEND_URL_CONSTANT = {
  LOGIN: 'api/auth/login',
  REGISTER: 'api/auth/register',
  REFRESH_TOKEN: 'api/auth/refresh',
  LOGOUT: 'api/auth/logout  ',
  ME: 'api/user/me',
  GET_CHAT_USERS: '/api/chat-users',
  GET_CHATS: '/api/chats',
  GET_MESSAGES: '/api/chats/{chat_id}/messages',
  GET_CHAT_BY_USER: '/api/user/{user_id}/chat',
  GET_CHAT_ID: '/api/chats/get-chat-id',
};

export const urlBuilder = (url: string, params: {}) => {
  Object.keys(params).forEach((key: string) => {
    url = url.replace(`{${key}}`, (params as any)[key]);
  });

  return url;
};
