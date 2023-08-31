import { SET_USER_DETAILS, RESET_USER_REDUCER } from "../utils/Constants";

export const setUserDetails = data => {
  return {
    type: SET_USER_DETAILS,
    payload: data,
  };
};

export const resetUserDetails = () => {
  return {
    type: RESET_USER_REDUCER,
  };
};
