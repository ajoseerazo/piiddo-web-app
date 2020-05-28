import { useRef } from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const getMapBounds = (locations) => {
  const bounds = new google.maps.LatLngBounds();

  locations.forEach((location) => {
    bounds.extend(new google.maps.LatLng(location.lat, location.lng));
  });
  return bounds;
};

const apiIsLoaded = (map, locations) => {
  if (map) {
    const bounds = getMapBounds(locations);
    map.fitBounds(bounds);
    // bindResizeListener(map, bounds);
  }
};

const GoogleMaps = withGoogleMap(
  ({ storeLocation, customerLocation, riderLocation }) => {
    //const map = useRef();
    let storeMarker = new window.google.maps.MarkerImage(
      "https://cdn.pixabay.com/photo/2018/07/11/23/44/shop-3532260_960_720.png",
      null /* size is determined at runtime */,
      null /* origin is 0,0 */,
      null /* anchor is bottom center of the scaled image */,
      new window.google.maps.Size(58, 58)
    );

    let customerIcon = new window.google.maps.MarkerImage(
      "https://freesvg.org/img/Isometric-House.png",
      null /* size is determined at runtime */,
      null /* origin is 0,0 */,
      null /* anchor is bottom center of the scaled image */,
      new window.google.maps.Size(58, 58)
    );

    let riderIcon = new window.google.maps.MarkerImage(
      "https://image.flaticon.com/icons/svg/2937/2937008.svg",
      null /* size is determined at runtime */,
      null /* origin is 0,0 */,
      null /* anchor is bottom center of the scaled image */,
      new window.google.maps.Size(58, 58)
    );

    return (
      <GoogleMap
        defaultZoom={15}
        defaultCenter={customerLocation}
        ref={(map) => {
          apiIsLoaded(map, [storeLocation, customerLocation]);
        }}
      >
        <Marker position={storeLocation} icon={storeMarker} />
        <Marker position={customerLocation} icon={customerIcon} />
        {riderLocation && <Marker position={riderLocation} icon={riderIcon} />}
      </GoogleMap>
    );
  }
);

export default GoogleMaps;
