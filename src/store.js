import { combineReducers, legacy_createStore as createStore} from "@reduxjs/toolkit";

import authReducer from "./authSlice";
const reducers = combineReducers({
    auth: authReducer,
    register: authReducer,
    expenses: ()=>({})  
})
export const store = createStore(reducers);