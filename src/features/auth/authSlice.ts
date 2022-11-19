/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthService } from '../../api/authService';

export interface AuthState {
  isAuthorized: boolean;
  token: string | null;
}

const initialState: AuthState = {
  isAuthorized: true,
  token: null,
};

const authService = new AuthService();

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

export default authSlice.reducer;
