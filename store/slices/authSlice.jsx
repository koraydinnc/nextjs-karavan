import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
     token:null,
     user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setUser: (state,action) => {
            state.user = action.payload
        },
        clearUser: (state, action) => {
            Cookies.remove('userToken')
            state.user = null
            state.token = null
        }
    },
});

export const { setToken, clearUser, setUser } = authSlice.actions;
export default authSlice.reducer;
