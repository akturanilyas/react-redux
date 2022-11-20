/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface AuthState {
  isAuthorized: boolean;
  token: string | null;
}

const initialState: AuthState = {
  isAuthorized: false,
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
  },
});

export const { login, logout, signIn } = authSlice.actions;

export const selectToken = (state: RootState) => state.auth.token;
export const selectIsAuthorized = (state: RootState) => state.auth.isAuthorized;

export default authSlice.reducer;
