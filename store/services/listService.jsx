import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie"; 

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const listApi = createApi({
  reducerPath: 'listApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');
    
    const token = Cookies.get('userToken');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    
    return headers;
  },
  endpoints: (builder) => ({
    list: builder.query({
      query: () => ({
        url: '/user/reservation/reservation-list',
        method: 'GET'
      })
    })
  })
});

export const { useListQuery } = listApi;
