const appActions = {
  SELECT_CURRENCY: "SELECT_CURRENCY",
  selectCurrency: (currency) => {
    return {
      type: appActions.SELECT_CURRENCY,
      currency
    }
  }
}

export default appActions