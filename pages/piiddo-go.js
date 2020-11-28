import React, { useState, useCallback, useEffect } from "react";
import ShopHeader from "../src/components/ShopHeader/ShopHeader";
import GoogleMaps from "../src/components/GoogleMaps";
import Autocomplete from "../src/components/Autocomplete";
import MyPositionButton from "../src/components/MyPositionButton";
import styled from "styled-components";
import { Button } from "reactstrap";
import LoadingSpinner from "../src/components/LoadingSpinner";
import moment from "moment";
import MetaTags from "../src/components/MetaTags";

const peakTimeRange = ["10:00", "13:00"];
const METER_VALUE = 0.00035;
const MIN_DISTANCE_IN_METERS = 1500;

export const getRouteCoordinates = async (l1, l2) => {
  const directionsService = new window.google.maps.DirectionsService();

  return new Promise((resolve, reject) => {
    directionsService.route(
      {
        origin: new window.google.maps.LatLng(l1.lat, l1.lng),
        destination: new window.google.maps.LatLng(l2.lat, l2.lng),
        travelMode: "DRIVING",
      },
      function (response, status) {
        if (status === "OK") {
          resolve(response);
        } else {
          reject();
        }
      }
    );
  });
};

export const calculatePrice = (distance) => {
  const baseMin = moment(peakTimeRange[0], "HH:mm");
  const baseMax = moment(peakTimeRange[1], "HH:mm");

  const dynamicBase =
    moment().isAfter(baseMin) && moment().isBefore(baseMax) ? 0 : 0;

  if (distance <= MIN_DISTANCE_IN_METERS) {
    const basePrice = dynamicBase + 0.5;

    return basePrice;
  } else {
    const p = distance * METER_VALUE;
    return p;
  }
};

const STEPS = {
  SELECT_PLACES: "SELECT_PLACES",
  DO_CALCULATION: "DO_CALCULATION",
};

const PiiddoGo = () => {
  const [fromPlace, setFromPlace] = useState();
  const [toPlace, setToPlace] = useState();
  const [step, setStep] = useState(STEPS.SELECT_PLACES);
  const [directions, setDirections] = useState();
  const [loading, setLoading] = useState(false);
  const [distance, setDistance] = useState();
  const [price, setPrice] = useState();

  const drawRoute = useCallback(async () => {
    try {
      setLoading(true);

      const route = await getRouteCoordinates(
        {
          lat: fromPlace.lat,
          lng: fromPlace.lng,
        },
        {
          lat: toPlace.lat,
          lng: toPlace.lng,
        }
      );

      setStep(STEPS.DO_CALCULATION);
      setDirections(route);
    } catch (err) {
      console.log(err);
      alert("Ocurrió un error calculando la ruta");
    } finally {
      setLoading(false);
    }
  }, [fromPlace, toPlace]);

  useEffect(() => {
    if (directions) {
      const distance = directions.routes[0].legs[0].distance.value;
      const price = calculatePrice(distance);

      setDistance(distance);
      setPrice(price);
    }
  }, [directions]);

  return (
    <>
      <MetaTags
        title={`Piiddo | Pide transporte con PiiddoGo`}
        description={`Piiddo | Pide transporte con PiiddoGo`}
        url={"https://piiddo.com/piido-go"}
      />
      <ShopHeader
        hideAddressSelector
        hideBackButton
        hideSarchBar
        hideShoppingCart
        hideCitySelector
      />

      <Styld.PageWrapper>
        <Styld.FormWrapper>
          <Styld.FormControl>
            <Styld.InputWrapper>
              <Autocomplete
                placeholder="Desde. Ingresa un sector o punto de referencia"
                style={{
                  width: "100%",
                }}
                blurOnSelect={true}
                CustomComponent={(props) => (
                  <Styld.Input
                    {...props}
                    style={{
                      paddingRight: 60,
                    }}
                  />
                )}
                onSelect={({ lat, lng, value }) => {
                  setFromPlace({
                    lat,
                    lng,
                    value,
                  });
                }}
              />
              <Styld.MyPositionButtonWrapper>
                <MyPositionButton
                  tiny
                  onLocationSuccess={(location) =>
                    setFromPlace({
                      ...location,
                      value: "Mi ubicación",
                    })
                  }
                />
              </Styld.MyPositionButtonWrapper>
            </Styld.InputWrapper>
          </Styld.FormControl>

          <Styld.FormControl>
            <Autocomplete
              placeholder="Hasta. Ingresa un sector o punto de referencia"
              style={{
                width: "100%",
              }}
              blurOnSelect={true}
              CustomComponent={(props) => <Styld.Input {...props} />}
              onSelect={({ lat, lng, value }) => {
                setToPlace({
                  lat,
                  lng,
                  value,
                });
              }}
            />
          </Styld.FormControl>

          {distance && price && (
            <Styld.FormControl>
              <Styld.Summary>
                <div>
                  Distancia:{" "}
                  <strong>{parseFloat(distance / 1000).toFixed(2)}km</strong>
                </div>
                <div>
                  Costo: <strong>{parseFloat(price).toFixed(1)}$</strong>
                </div>
              </Styld.Summary>
            </Styld.FormControl>
          )}

          <Styld.Button
            disabled={
              !(
                fromPlace &&
                fromPlace.lat &&
                fromPlace.lng &&
                toPlace &&
                toPlace.lat &&
                toPlace.lng
              )
            }
            onClick={drawRoute}
          >
            {!loading ? "Continuar" : <LoadingSpinner />}
          </Styld.Button>
        </Styld.FormWrapper>

        <GoogleMaps
          containerElement={<Styld.MapWrapperStyled />}
          mapElement={<div style={{ height: `100%` }} />}
          withAPIDirections
          directions={directions}
        />
      </Styld.PageWrapper>
    </>
  );
};

const Styld = {
  MapWrapperStyled: styled.div`
    height: calc(100vh - 70px);

    @media screen and (max-width: 768px) {
      height: calc(100vh - 252px);
    }
  `,
  PageWrapper: styled.div`
    margin-top: 70px;

    @media screen and (max-width: 768px) {
      margin-top: 50px;
    }
  `,
  FormWrapper: styled.div`
    width: 380px;
    min-height: 200px;
    background-color: white;
    position: absolute;
    top: 85px;
    left: 10px;
    z-index: 1;
    box-shadow: 0 6px 10px 0 rgba(128, 98, 96, 0.16);
    border-radius: 20px;
    padding: 16px;

    @media screen and (max-width: 768px) {
      top: auto;
      bottom: 0px;
      left: 0px;
      border-radius: 0px;
      width: 100%;
    }
  `,
  Input: styled.input`
    width: 100%;
    height: 50px;
    background: #f7f7f7;
    border: none;
    border-radius: 8px;
    padding: 12px;

    &:focus {
      box-shadow: none;
      outline: none;
    }

    @media screen and (max-width: 768px) {
      font-size: 12px;
    }
  `,
  FormControl: styled.div`
    margin-bottom: 10px;
  `,
  Button: styled(Button)`
    width: 100%;
    background: #f74342;
    border: none;
    border-radius: 8px;
    height: 50px;
    font-size: 14px;

    &:disabled {
      border: none;
      background-color: #f74342;
      color: white;
      opacity: 0.7;

      &:hover {
        cursor: initial;
        box-shadow: none;
      }
    }

    &:hover,
    &:active,
    &:visited  {
      background: #f74342;
      border: none;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
        0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
    }
  `,
  InputWrapper: styled.div`
    position: relative;
  `,
  MyPositionButtonWrapper: styled.div`
    position: absolute;
    right: 5px;
    top: 10px;
    z-index: 1000;
  `,
  Summary: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `,
};

export default PiiddoGo;
