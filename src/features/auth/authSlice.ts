/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface AuthState {
  isAuthorized: boolean;
  userId: number | null;
  token: string | null;
}

const initialState: AuthState = {
  isAuthorized: false,
  userId: null,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.isAuthorized = true;
    },
    signIn: (state, action: PayloadAction<object>) => {},
    logout: (state) => {
      console.log(state);
    },
    me: (state, action: PayloadAction<number>) => {
      state.userId = action.payload as number;
    },
  },
});

export const { login, logout, signIn, me } = authSlice.actions;

export const selectToken = (state: RootState) => state.auth.token;
export const selectIsAuthorized = (state: RootState) => state.auth.isAuthorized;
export const selectUserId = (state: RootState) => state.auth.userId;

export default authSlice.reducer;
