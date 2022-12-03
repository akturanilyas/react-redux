import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../app/store';
import { AuthService } from '../services/authService';

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  prepareHeaders: async (headers, { getState }) => {
    let { token } = (getState() as RootState).auth;
    const authService = new AuthService();

    if (token) {
      headers.set('auth-token', token);
    } else {
      token = await authService.getToken();
      if (token) {
        headers.set('auth-token', token);
      }
    }

    return headers;
  },
});
