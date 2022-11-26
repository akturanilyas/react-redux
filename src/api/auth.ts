// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BackendUrlConstant } from '../constants/backendUrlConstant';
import { ActionTypes } from '../enums/actionType';

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BACKEND_URL }),
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
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginQueryMutation, useRegisterQueryMutation } = authApi;
