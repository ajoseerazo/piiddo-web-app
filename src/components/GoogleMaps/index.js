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
      "https://firebasestorage.googleapis.com/v0/b/genial-core-212201.appspot.com/o/map-markers%2FSin%20ti%CC%81tulo-1.png?alt=media&token=a3c09338-474d-4e5f-a507-f5a3f4e7b6d2",
      null /* size is determined at runtime */,
      null /* origin is 0,0 */,
      null /* anchor is bottom center of the scaled image */,
      new window.google.maps.Size(58, 58)
    );

    let customerIcon = new window.google.maps.MarkerImage(
      "https://firebasestorage.googleapis.com/v0/b/genial-core-212201.appspot.com/o/map-markers%2Fllegada.png?alt=media&token=ba525469-867b-4f39-8286-2879d408c2b9",
      null /* size is determined at runtime */,
      null /* origin is 0,0 */,
      null /* anchor is bottom center of the scaled image */,
      new window.google.maps.Size(58, 58)
    );

    let riderIcon = new window.google.maps.MarkerImage(
      "https://firebasestorage.googleapis.com/v0/b/genial-core-212201.appspot.com/o/map-markers%2FRaider%20vector.png?alt=media&token=8cabcebc-98d8-4770-8a9a-1d86ad897425",
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
