import { api } from "../../api";
import { setIsAuth, setAuthError } from "../actions/AuthManagementAction";
import { resetUserDetails } from "../actions/UserManagementAction";

export const login = (user, dispatch) => {
  return new Promise(async (resolve, reject) => {
    await api()
      .post(`/auth/login`, { ...user })
      .then(response => {
        localStorage.setItem("token", response.data.token);
        dispatch(setIsAuth(true));
        resolve(response.data);
      })
      .catch(error => {
        dispatch(setAuthError(error?.response?.data?.message));
        reject(error?.response?.data?.message);
      });
  });
};

export const register = (user, dispatch) => {
  return new Promise(async (resolve, reject) => {
    await api()
      .post(`/auth/register`, { ...user })
      .then(response => {
        localStorage.setItem("token", response.data.token);
        dispatch(setIsAuth(true));
        resolve(response.data);
      })
      .catch(error => {
        dispatch(setAuthError(error?.response?.data?.error?.msg));
        reject(error?.response?.data?.error?.msg);
      });
  });
};

export const logout = dispatch => {
  return new Promise(async (resolve, reject) => {
    await api()
      .get(`/auth/logout`)
      .then(response => {
        localStorage.setItem("token", response.data.token);
        dispatch(setIsAuth(false));
        dispatch(resetUserDetails());
        resolve(response.data);
      })
      .catch(error => {
        dispatch(setIsAuth(error));
        dispatch(setAuthError(error?.response?.data?.message));
        dispatch(resetUserDetails());
        reject(error?.response?.data?.message);
      });
  });
};
