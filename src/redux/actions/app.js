const appActions = {
  SELECT_CURRENCY: "SELECT_CURRENCY",
  SELECT_CITY: "SELECT_CITY",
  INIT_APP: "INIT_APP",
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
  }
}

export default appActions