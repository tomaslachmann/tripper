import {
    GET_FRIEND_REQUEST,
    SEND_FRIEND_REQUEST,
    ACCEPT_FRIEND_REQUEST,
    DECLINE_FRIEND_REQUEST,
    GET_FRIEND_REQUEST_FAIL,
    HANDLE_FRIEND_REQUEST,
    SET_MESSAGE,
  } from "./types";
  

  import RequestService from "../services/Request/RequestService";
  
  export const get = (token) => (dispatch) => {
    return RequestService.get(token).then(
      (response) => {
        dispatch({
          type: HANDLE_FRIEND_REQUEST,
          payload: response.request
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: GET_FRIEND_REQUEST_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };

  
  export const handle = ( token, id, type ) => (dispatch) => {
    return RequestService.handle( token, id, type ).then(
      (response) => {
        dispatch({
          type: GET_FRIEND_REQUEST,
          payload: response.request
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: GET_FRIEND_REQUEST_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  }
  
  export const selectRequests = (state) => state.request;