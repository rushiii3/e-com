import {createReducer} from '@reduxjs/toolkit';
const initalState = {
    isAuthenticated : false, 
}

export const userReducer = createReducer(initalState,{
    LoadUserRequest:(state) => {
        state.loading = true;
    },
    LoadUserSuccess:(state,action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.user = action.payload;
    },
    LoadUserFailed: (state,action) => {
        state.loading = false;
        state.isAuthenticated  =  false;
        state.error = action.payload;
    },
    ClearError : (state) => {
        state.error = null;
    }

})