import { useState, useEffect, Suspense, useCallback } from "react";
import { Modal, ModalBody, Button } from "reactstrap";
import {
  ModalStyled,
  ModalBodyStyled,
  TitleStyled,
  MapNotification,
  ModalFooter,
  ButtonStyled,
  CurrentAddress,
  MapElementStyled
} from "./styled";
import { CloseButton } from "../ProductModal/styled";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { DEFAULT_LOCATION } from "../../utils/constants";

library.add([faTimes, faMapMarkerAlt]);

const LocationPicker = React.lazy(() => import("react-location-picker"));

const PlacePickerModal = ({ isOpen, place, onClose, onAccept }) => {
  const [isBrowser, setIsBrowser] = useState();
  const [address, setAddress] = useState(place ? place.value : DEFAULT_LOCATION.value);
  const [location, setLocation] = useState();
  const [notificationOpened, setNotificationOpened] = useState(true);

  useEffect(() => {
    if (!isBrowser) {
      if (typeof window !== "undefined") {
        setIsBrowser(true);
      }
    }
  }, [isBrowser, place]);

  const handlePositionChange = useCallback(
    ({ position, address, places }) => {
      setAddress(address);
      setLocation(position);

      if (notificationOpened) {
        setNotificationOpened(false);
      }
    },
    [notificationOpened]
  );

  const onAcceptLocation = useCallback(() => {
    onAccept({
      address: address ? address : place.value,
      location: location ? location : { lat: place.lat, lng: place.lng },
    });
  }, [onAccept, address, location, place]);

  return (
    <ModalStyled isOpen={isOpen}>
      <ModalBodyStyled>
        <CloseButton onClick={onClose}>
          <FontAwesomeIcon icon="times" />
        </CloseButton>

        <TitleStyled>Encontramos tu ubicación aproximada</TitleStyled>

        {notificationOpened && (
          <MapNotification>
            Puedes mover el pin hasta tu ubicación exacta
          </MapNotification>
        )}

        {isBrowser && (
          <Suspense fallback={<div></div>}>
            <LocationPicker
              containerElement={<div/>}
              mapElement={<MapElementStyled />}
              defaultPosition={{
                lat: place ? place.lat : DEFAULT_LOCATION.lat,
                lng: place ? place.lng : DEFAULT_LOCATION.lng,
              }}
              zoom={15}
              radius={-1}
              onChange={handlePositionChange}
            />
          </Suspense>
        )}

        <ModalFooter>
          <CurrentAddress>
            <FontAwesomeIcon icon="map-marker-alt" color="#f74342" />
            <span>{address || (place || {}).value}</span>
          </CurrentAddress>
          <ButtonStyled onClick={onAcceptLocation}>
            Confirmar ubicación
          </ButtonStyled>
        </ModalFooter>
      </ModalBodyStyled>
    </ModalStyled>
  );
};

export default PlacePickerModal;
