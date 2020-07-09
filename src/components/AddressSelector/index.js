import { useState, useCallback, useEffect } from "react";
import {
  AddressSelectorWrapper,
  ChevronIconWrapper,
  LeftContent,
} from "./styled";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faMapMarkerAlt,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import PlacePickerModal from "../PlacePickerModal";

library.add([faTimes, faMapMarkerAlt, faChevronDown]);

const AddressSelector = ({
  place,
  showAutocomplete = true,
  onSetAddress,
  disabled = false,
}) => {
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

  const onSetAddressHandler = useCallback((location) => {
    setAddress(location.address);
    onSetAddress(location);
    closePlacePickerModal();
  });

  useEffect(() => {
    if (place) {
      setAddress(place.address);
    }
  }, [place]);

  return (
    <>
      <AddressSelectorWrapper onClick={disabled ? null : onClick}>
        <LeftContent>
          <FontAwesomeIcon icon="map-marker-alt" color="#f74342" />

          <span>{address ? address : "Ingresa dirección"}</span>
        </LeftContent>

        {!disabled && (
          <ChevronIconWrapper>
            <FontAwesomeIcon icon="chevron-down" />
          </ChevronIconWrapper>
        )}
      </AddressSelectorWrapper>

      <PlacePickerModal
        place={place}
        isOpen={isPlacePickerModalOpened}
        onClose={closePlacePickerModal}
        onAccept={onSetAddressHandler}
        showAutocomplete={showAutocomplete}
      />
    </>
  );
};

export default AddressSelector;
