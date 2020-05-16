import { AddressSelectorWrapper } from "./styled";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

library.add([faTimes, faMapMarkerAlt]);

const AddressSelector = ({ address }) => {
  return (
    <AddressSelectorWrapper>
      <FontAwesomeIcon icon="map-marker-alt" color="#f74342" />
      <span>{address}</span>
    </AddressSelectorWrapper>
  );
};

export default AddressSelector;
