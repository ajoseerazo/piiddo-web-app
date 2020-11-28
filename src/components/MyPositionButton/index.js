import { useCallback } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { MyPositionButtonWrapper } from "./styled";

library.add([faLocationArrow]);

const MyPositionButton = ({ onLocationSuccess, tiny }) => {
  const onSuccess = useCallback((position) => {
    onLocationSuccess({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  });

  const onError = useCallback((error) => {
    alert("Error al obtener tu localización");

    console.log(error);
  });

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      alert("Error al obtener tu localización");
    } else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  });

  return (
    <MyPositionButtonWrapper onClick={requestLocation} tiny={tiny}>
      <FontAwesomeIcon icon="location-arrow" />
      {!tiny && <span>Mi ubicación</span>}
    </MyPositionButtonWrapper>
  );
};

export default MyPositionButton;
