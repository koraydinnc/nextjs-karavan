import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './services/authService';
import authReducer from './slices/authSlice'; 

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
