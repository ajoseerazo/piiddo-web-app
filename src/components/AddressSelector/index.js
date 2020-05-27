import { AddressSelectorWrapper } from "./styled";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

library.add([faTimes, faMapMarkerAlt]);

const AddressSelector = ({ address, onClick }) => {
  return (
    <AddressSelectorWrapper onClick={onClick}>
      <FontAwesomeIcon icon="map-marker-alt" color="#f74342" />
      <span>{address ? address : "Ingresa dirección"}</span>
    </AddressSelectorWrapper>
  );
};

export default AddressSelector;
