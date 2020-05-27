import { useState, useCallback } from "react";
import { AddressSelectorWrapper } from "./styled";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import PlacePickerModal from "../PlacePickerModal";

library.add([faTimes, faMapMarkerAlt]);

const AddressSelector = ({ place, showAutocomplete = true }) => {
  const [isPlacePickerModalOpened, setIsPlacePickerModalOpened] = useState(
    false
  );

  const [address, setAddress] = useState();

  const onClick = useCallback(() => {
    setIsPlacePickerModalOpened(true);
  }, [setIsPlacePickerModalOpened]);

  const closePlacePickerModal = useCallback(() => {
    setIsPlacePickerModalOpened(false);
  });

  const onSetAddress = useCallback((location) => {
    setAddress(location.address);
    closePlacePickerModal();
  })

  return (
    <>
      <AddressSelectorWrapper onClick={onClick}>
        <FontAwesomeIcon icon="map-marker-alt" color="#f74342" />
        <span>{address ? address : "Ingresa dirección"}</span>
      </AddressSelectorWrapper>

      <PlacePickerModal
        isOpen={isPlacePickerModalOpened}
        onClose={closePlacePickerModal}
        onAccept={onSetAddress}
        showAutocomplete={showAutocomplete}
      />
    </>
  );
};

export default AddressSelector;
