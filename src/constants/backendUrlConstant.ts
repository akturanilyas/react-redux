export const BackendUrlConstant = {
  LOGIN: 'api/auth/login',
  REGISTER: 'api/auth/register',
  GET_CHAT_USERS: '/api/chat-users',
  GET_CHATS: '/api/chats',
  GET_MESSAGES: '/api/chats/{chatId}/messages',
};

export const urlBuilder = (url: string, params: {}) => {
  Object.keys(params).forEach((key: string) => {
    url = url.replace(`{${key}}`, (params as any)[key]);
  });

  return url;
};
