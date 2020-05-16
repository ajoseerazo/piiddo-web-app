const locationActions = {
  SET_DELIVERY_PLACE: "SET_DELIVERY_PLACE",
  setDeliveryPlace: (place) => {
    console.log("PLACE", place);
    return {
      type: locationActions.SET_DELIVERY_PLACE,
      place,
    };
  }
};

export default locationActions;
