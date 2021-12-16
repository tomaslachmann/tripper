import {
    GET_FRIEND_REQUEST,
    SEND_FRIEND_REQUEST,
    ACCEPT_FRIEND_REQUEST,
    DECLINE_FRIEND_REQUEST,
    GET_FRIEND_REQUEST_FAIL,
    HANDLE_FRIEND_REQUEST
  } from "../features/types";
  
  const requests = JSON.parse(localStorage.getItem("requests"));

  const initialState = requests
    ? { requests }
    : { requests:null };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_FRIEND_REQUEST_FAIL:
        return {
          ...state,
          requests:null
        };
      case GET_FRIEND_REQUEST:
        return {
          ...state,
          requests: payload,
        };
      case SEND_FRIEND_REQUEST:
        return {
          ...state,
          requests: payload,
        };
      case HANDLE_FRIEND_REQUEST:
        return {
          ...state,
          requests: payload
        }
      default:
        return state;
    }
  }