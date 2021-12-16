import {
    GET_ALL_FRIENDS,
    GET_FRIEND_FAIL,
    DELETE_FRIEND,
    SET_MESSAGE
  } from "./types";
  
  import FriendService from "../services/Friend/FriendService";
  
  export const getAllFriends = (token) => (dispatch) => {
    return FriendService.get(token).then(
      (response) => {
        dispatch({
          type: GET_ALL_FRIENDS,
          payload: response.friends
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
          type: GET_FRIEND_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };

  export const deleteFriend = (token, id) => (dispatch) => {
    return FriendService.delete(token, id).then(
      (response) => {
        dispatch({
          type: DELETE_FRIEND,
          payload: response.friends
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
          type: GET_FRIEND_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };
  
  export const selectFriends = (state) => state.friends;