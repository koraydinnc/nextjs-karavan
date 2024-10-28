import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: ({ name,surname, email, password }) => ({
        url: '/auth/register',
        method: 'POST',
        body: {
          name,
          surname,
          email,
          password,
        },
      }),
    }),
    login : builder.mutation({
      query: ({email, password}) => ({
        url:'/auth/login',
        method:'POST',
        body: {
          email,
          password
        }
      })
    })
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
