import { combineReducers } from "redux";
import auth_Reducer from "./auth/auth";
import auto_Reducer from "./auth/autoRender";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

const rooteReducer = combineReducers({
  auth: auth_Reducer,
  autoRender : auto_Reducer,
});

const store = configureStore({
  reducer: rooteReducer,
  middleware: [thunk],
});



export default store;
