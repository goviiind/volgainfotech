import { ADD_USER, DELETE_USER } from "../types";

//Action to add user in the reducer
export const addUser = (data) => {
  return {
    type: ADD_USER,
    payload: data,
  };
};

//Action to delete user in the reducer
export const deleteUser = (data) => {
  return {
    type: DELETE_USER,
    payload: data,
  };
};
