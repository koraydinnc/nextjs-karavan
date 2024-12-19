import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './services/authService';
import authReducer from './slices/authSlice'; 
import { searchApi } from './services/searchService';
import { listApi } from './services/listService';

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
    [listApi.reducerPath]: listApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware,listApi.middleware, searchApi.middleware),
});

export default store;
