import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
  } from "../features/types";
  
  const token = JSON.parse(localStorage.getItem("token"));
  const user = JSON.parse(localStorage.getItem("user"));
  
  const initialState = token
    ? { isLoggedIn: true, token, user }
    : { isLoggedIn: false, token: null, user: {id: null, email:null, password: null} };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case REGISTER_SUCCESS:
        return {
          ...state,
          isLoggedIn: false,
        };
      case REGISTER_FAIL:
        return {
          ...state,
          isLoggedIn: false,
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          isLoggedIn: true,
          token: payload.token,
          user: payload.user,
        };
      case LOGIN_FAIL:
        return {
          ...state,
          isLoggedIn: false,
          token: null,
          user: null
        };
      case LOGOUT:
        return {
          ...state,
          isLoggedIn: false,
          token: null,
          user: null
        };
      default:
        return state;
    }
  }