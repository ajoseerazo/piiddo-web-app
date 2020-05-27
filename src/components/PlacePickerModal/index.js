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
  MapElementStyled,
  InputStyled,
  AutocompleteWrapper,
} from "./styled";
import { CloseButton } from "../ProductModal/styled";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { DEFAULT_LOCATION } from "../../utils/constants";
import Autocomplete from "../Autocomplete";
import MyPositionButton from "../MyPositionButton";

library.add([faTimes, faMapMarkerAlt]);

const LocationPicker = React.lazy(() => import("react-location-picker"));

const PlacePickerModal = ({
  isOpen,
  place,
  onClose,
  onAccept,
  showAutocomplete,
}) => {
  const [isBrowser, setIsBrowser] = useState();
  const [address, setAddress] = useState(DEFAULT_LOCATION.address);
  const [location, setLocation] = useState();
  const [notificationOpened, setNotificationOpened] = useState(true);
  const [defaultPosition, setDefaultPosition] = useState(DEFAULT_LOCATION);

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
      setDefaultPosition(position);

      if (notificationOpened) {
        setNotificationOpened(false);
      }
    },
    [notificationOpened]
  );

  const onAcceptLocation = useCallback(() => {
    onAccept({
      address: address ? address : place.address,
      location: location
        ? location
        : {
            lat:
              place && place.location
                ? place.location.lat
                : DEFAULT_LOCATION.lat,
            lng:
              place && place.location
                ? place.location.lng
                : DEFAULT_LOCATION.lng,
          },
    });
  }, [onAccept, address, location, place]);

  useEffect(() => {
    if (place && place.address && place.location) {
      setAddress(place.address);
      setLocation(place.location);
      setDefaultPosition(place.location);
    }
  }, [place]);

  const onLocationSuccess = useCallback((location) => {
    setDefaultPosition(location);
  });

  const onClosePicker = useCallback(() => {
    onClose();
    setAddress(place.address);
    setLocation(place.location);
    setDefaultPosition(place.location);
  }, [place]);

  return (
    <ModalStyled isOpen={isOpen}>
      <ModalBodyStyled>
        <CloseButton onClick={onClosePicker}>
          <FontAwesomeIcon icon="times" />
        </CloseButton>

        <TitleStyled>
          {showAutocomplete ? (
            <AutocompleteWrapper>
              <Autocomplete
                placeholder="Ingresa un sector o punto de referencia"
                onSelect={async ({ lat, lng, value }) => {
                  setDefaultPosition({
                    lat,
                    lng,
                    value,
                  });
                }}
                style={{
                  width: "100%",
                }}
                blurOnSelect={true}
                CustomComponent={InputStyled}
              />
              <div className="my-position-wrapper">
                <MyPositionButton onLocationSuccess={onLocationSuccess} />
              </div>
            </AutocompleteWrapper>
          ) : (
            <span>Encontramos tu ubicación aproximada</span>
          )}
        </TitleStyled>

        {notificationOpened && (
          <MapNotification>
            Puedes mover el pin hasta tu ubicación exacta
          </MapNotification>
        )}

        {isBrowser && (
          <Suspense fallback={<MapElementStyled />}>
            <LocationPicker
              containerElement={<div />}
              mapElement={<MapElementStyled />}
              defaultPosition={defaultPosition}
              zoom={15}
              radius={-1}
              onChange={handlePositionChange}
            />
          </Suspense>
        )}

        <ModalFooter>
          <CurrentAddress>
            <FontAwesomeIcon icon="map-marker-alt" color="#f74342" />
            <span>{address}</span>
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
