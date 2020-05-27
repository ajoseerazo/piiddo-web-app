const locationActions = {
  SET_DELIVERY_PLACE: "SET_DELIVERY_PLACE",
  GET_DELIVERY_PLACE: "GET_DELIVERY_PLACE",
  setDeliveryPlace: (place) => {
    return {
      type: locationActions.SET_DELIVERY_PLACE,
      place,
    };
  },
  getDeliveryPlace: () => {
    return {
      type: locationActions.GET_DELIVERY_PLACE
    }
  }
};

export default locationActions;
