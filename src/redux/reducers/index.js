import { combineReducers } from "redux";
import userListReducer from "./userListReducer";

//Reducers are combined here
export const rootReducer = combineReducers({
  userList: userListReducer,
});
