import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from '../api/auth';
import { chatApi } from '../api/chat';
import { userApi } from '../api/user';
import authReducer from '../features/auth/authSlice';
import counterReducer from '../features/counter/counterSlice';
import { rtkQueryErrorLogger } from '../features/errorMiddleware';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    user: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(chatApi.middleware)
      .concat(rtkQueryErrorLogger),
  devTools: true,
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
