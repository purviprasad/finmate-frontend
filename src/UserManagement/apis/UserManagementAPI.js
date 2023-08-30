import { api } from "../../api";
import { setUserDetails } from "../actions/UserManagementAction";
import { setAuthError } from "../actions/AuthManagementAction";

export const getUserDetails = dispatch => {
  return new Promise(async (resolve, reject) => {
    await api()
      .get(`/user/viewUserDetails`)
      .then(response => {
        dispatch(setUserDetails(response.data.data[0]));
        resolve(response.data);
      })
      .catch(error => {
        dispatch(setAuthError(error?.response?.data?.message));
        reject(error?.response?.data?.message);
      });
  });
};

export const updateUserAvatar = (avatar, dispatch) => {
  return new Promise(async (resolve, reject) => {
    await api()
      .put(`/user/updateUserAvatar`, { avatar })
      .then(response => {
        dispatch(setUserDetails({ avatar }));
        resolve(response.data?.msg);
      })
      .catch(error => {
        reject(error?.response?.data?.error?.msg);
      });
  });
};

export const updateUserPassword = password => {
  return new Promise(async (resolve, reject) => {
    await api()
      .put(`/user/updateUserPassword`, password)
      .then(response => {
        resolve(response.data?.msg);
      })
      .catch(error => {
        reject(error?.response?.data?.error?.msg);
      });
  });
};
