// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../app/store';
import { BackendUrlConstant } from '../constants/backendUrlConstant';
import { ActionTypes } from '../enums/actionType';
import { AuthService } from '../services/authService';

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: async (headers, { getState }) => {
      let { token } = (getState() as RootState).auth;

      if (token) {
        headers.set('auth-token', token);
      } else {
        token = await AuthService.getToken();
        if (token) {
          headers.set('auth-token', token);
        }
      }

      return headers;
    },
  }),
  tagTypes: ['login'],

  endpoints: (builder) => ({
    loginQuery: builder.mutation({
      query: (payload) => ({
        url: BackendUrlConstant.LOGIN,
        method: ActionTypes.POST,
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    registerQuery: builder.mutation({
      query: (payload) => ({
        url: BackendUrlConstant.REGISTER,
        method: ActionTypes.POST,
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    me: builder.query({
      query: () => ({
        url: BackendUrlConstant.ME,
        method: ActionTypes.GET,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginQueryMutation, useMeQuery, useRegisterQueryMutation } = authApi;
