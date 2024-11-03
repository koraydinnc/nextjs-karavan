import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from 'js-cookie';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const searchApi = createApi({
  reducerPath: 'searchApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      
      const token = Cookies.get('userToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
   
      
      return headers;
    }
  }),
  endpoints: (builder) => ({
    search: builder.mutation({
      query: ({searchData}) => ({  
        url: '/user/reservation/search-reservation',
        method: 'POST',
        body: searchData, 
      }),
      transformResponse: (response)=> {
        console.log(response)
      },
      transformErrorResponse: (response) => {
        console.log(response)
      }
    }),
    
  }),
});

export const {useSearchMutation} = searchApi;
