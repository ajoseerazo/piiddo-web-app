import { useEffect, useState } from "react";
import locationActions from "../redux/actions/location";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import AddressSelector from "../components/AddressSelector";

const { setDeliveryPlace, getDeliveryPlace } = locationActions;

const AddressSelectorContainer = ({
  showAutocomplete,
  actions: { setDeliveryPlace, getDeliveryPlace },
  place,
  disabled,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      getDeliveryPlace();
    }
  }, [mounted]);

  return (
    <AddressSelector
      disabled={disabled}
      place={place}
      showAutocomplete={showAutocomplete}
      onSetAddress={setDeliveryPlace}
    />
  );
};

function mapStateToProps(state, props) {
  const { deliveryLocation, deliveryAddress } = state.Location;

  return {
    place: {
      address: deliveryAddress,
      location: deliveryLocation,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      { setDeliveryPlace, getDeliveryPlace },
      dispatch
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressSelectorContainer);
