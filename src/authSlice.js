import { createReducer, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
    loading: false,
    error: null
};

const authReducer  = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':   
            return {
                ...state,
                loading: true, 
                error: null
            };
        case 'LOGIN_SUCCESS':
            return { 
                ...state,
                loading: false,
                user: action.payload,
                error: null
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                loading: false,
                user: null,
                error: action.payload
            };
        default:
            return state;
    }
};

export default authReducer;