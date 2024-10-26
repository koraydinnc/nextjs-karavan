import { configureStore } from '@reduxjs/toolkit';
import { api } from '../services/api';
import yourReducer from '../features/yourSlice';
import { authApi } from './services/authService';

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
