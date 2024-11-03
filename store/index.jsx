import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './services/authService';
import authReducer from './slices/authSlice'; 
import { searchApi } from './services/searchService';

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, searchApi.middleware),
});

export default store;
