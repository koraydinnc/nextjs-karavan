import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: ({email, password}) => ({
        url:'/register',
        method:'POST',
        body:{
            email,
            password
        }

      }),
    }),
  }),
});

export const { useRegisterMutation } = authApi;
