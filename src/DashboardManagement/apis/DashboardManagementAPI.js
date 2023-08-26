import { api } from "../../api";
import {
  setDashboardDetails,
  setRecentTransactionsDetails,
  setDashboardPieDetails,
} from "../actions/DashboardManagementAction";

export const getMonthDashboardDetails = (dateType, date, dispatch) => {
  return new Promise(async (resolve, reject) => {
    await api()
      .post("/dashboard/viewDashboardDetails", {
        dateType: dateType,
        date: date,
      })
      .then(response => {
        let data = response.data?.data;
        dispatch(setDashboardDetails(data));
        if (dateType === "month") {
          dispatch(setDashboardPieDetails(data));
        }
        resolve(true);
      })
      .catch(error => {
        reject(error?.response?.data?.message);
      });
  });
};

export const getCashFlowDetails = (dateType, date, dispatch) => {
  return new Promise(async (resolve, reject) => {
    await api()
      .post("/dashboard/viewDashboardPieDetails", {
        dateType: dateType,
        date: date,
      })
      .then(response => {
        let data = response.data?.data;
        dispatch(setDashboardPieDetails(data));
        resolve(true);
      })
      .catch(error => {
        reject(error?.response?.data?.message);
      });
  });
};

export const loadRecentTransactionsDetails = (limit, dispatch) => {
  return new Promise(async (resolve, reject) => {
    await api()
      .get("/transaction/viewRecentTransactionDetails/" + limit)
      .then(response => {
        let data = response.data?.data;
        dispatch(setRecentTransactionsDetails(data));
        resolve(true);
      })
      .catch(error => {
        reject(error?.response?.data?.message);
      });
  });
};
