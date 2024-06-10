import { ADD_USER, DELETE_USER } from "../types";

//Initializing the reducer state
const initialState = {
  userList: [
    {
      id: 1,
      name: "Govind Sharma",
      email: "goviiind45@gmail.com",
      phone: "9892344283",
      address: "Mumbai",
    },
    {
      id: 2,
      name: "James",
      email: "james@gmail.com",
      phone: "9876543210",
      address: "Pune",
    },
    {
      id: 3,
      name: "Clara",
      email: "clara@gmail.com",
      phone: "7898765239",
      address: "Ahemdabad",
    },
    {
      id: 4,
      name: "Wayne",
      email: "wayne@gmail.com",
      phone: "9876338726",
      address: "Vapi",
    },
    {
      id: 5,
      name: "Maya",
      email: "maya@gmail.com",
      phone: "9387938739",
      address: "Noida",
    },
  ],
};

const userListReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_USER:
      return {
        ...state,
        userList: [payload, ...state.userList],
      };
    case DELETE_USER:
      return {
        ...state,
        userList: payload,
      };
    default:
      return state;
  }
};

export default userListReducer;
