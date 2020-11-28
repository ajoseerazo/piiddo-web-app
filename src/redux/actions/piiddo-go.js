const piiddoGoActions = {
  SET_RIDE_REQUEST: "SET_RIDE_REQUEST",
  setRideRequest: ({ fromPlace, toPlace, price, distance }) => {
    return {
      type: piiddoGoActions.SET_RIDE_REQUEST,
      rideRequest: {
        fromPlace,
        toPlace,
        price,
        distance,
      },
    };
  },
};

export default piiddoGoActions;
