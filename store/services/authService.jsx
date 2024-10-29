import { toast } from '@/hooks/use-toast';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie'; // cookies işlemleri için ekledik

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { endpoint }) => {
      headers.set('Content-Type', 'application/json');
      
      if (endpoint !== 'register' && endpoint !== 'login') {
        const token = Cookies.get('userToken');
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: ({ name, surname, email, password }) => ({
        url: 'user/auth/register',
        method: 'POST',
        body: {
          name,
          surname,
          email,
          password,
        },
      }),
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: 'user/auth/login',
        method: 'POST',
        body: {
          email,
          password,
        },
      }),
      transformResponse: (response) => {
        if (response.token) {
          Cookies.set('userToken', response.token, { expires: 7 });
        }
        return response;
      },
    }),
  }),
});


export const { useRegisterMutation, useLoginMutation } = authApi;
