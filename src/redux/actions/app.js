import API from "../../api";

const appActions = {
  SELECT_CURRENCY: "SELECT_CURRENCY",
  SELECT_CITY: "SELECT_CITY",
  INIT_APP: "INIT_APP",
  LOGOUT: "LOGOUT",
  selectCurrency: (currency) => {
    return {
      type: appActions.SELECT_CURRENCY,
      currency
    }
  },
  selectCity: (city) => {
    return {
      type: appActions.SELECT_CITY,
      city
    }
  },
  initApp: () => {
    return {
      type: appActions.INIT_APP
    }
  },
  logout: () => {
    return async (dispatch) => {
      try {
        await API.Auth.logout();
      } catch (error) {
        console.log("Error", error);
      }
    };
  }
}

export default appActions