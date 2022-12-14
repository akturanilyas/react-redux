import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from '../api/auth';
import { chatApi } from '../api/chat/chat';
import { messageApi } from '../api/message';
import { userApi } from '../api/user';
import authReducer from '../features/auth/authSlice';
import chatReducer from '../features/chat/chatSlice';
import counterReducer from '../features/counter/counterSlice';
import { rtkQueryErrorLogger } from '../features/errorMiddleware';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    user: userReducer,
    chatSlice: chatReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(chatApi.middleware)
      .concat(messageApi.middleware)
      .concat(rtkQueryErrorLogger),
  devTools: true,
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
