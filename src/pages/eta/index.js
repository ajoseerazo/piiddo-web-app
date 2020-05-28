import { useState, useEffect, useRef } from "react";
import ShopHeader from "../../components/ShopHeader/ShopHeader";
import GoogleMaps from "../../components/GoogleMaps";
import {
  EtaWrapper,
  MapWrapperStyled,
  NotificationsWrapper,
  ETAIcon,
  Time,
  TimeUnit,
  RightContent,
  ProgressSteps,
  StateText,
  Step,
  StepWrapper,
  CheckIconWrapper,
} from "./styled";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

library.add([faCheck]);

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, []);
}

const storeLocation = {
  lat: 8.5908368,
  lng: -71.1645412,
};

const customerLocation = {
  lat: 8.5846454,
  lng: -71.1582341,
};

const riderLocation = {
  lat: 8.5920289,
  lng: -71.1551657,
};

const states = [
  {
    value: "confirming-payment",
    text: "Estamos confirmando el pago",
    icon:
      "https://firebasestorage.googleapis.com/v0/b/genial-core-212201.appspot.com/o/money.png?alt=media&token=12aa9064-996c-40e3-b742-790724b53749",
  },
  {
    value: "confirming-order-with-partner",
    text: "Estamos confirmando la orden con la tienda",
    icon:
      "https://firebasestorage.googleapis.com/v0/b/genial-core-212201.appspot.com/o/cafe.png?alt=media&token=de0e1726-4d8a-4f9d-9215-7cae7f54526c",
  },
  {
    value: "order-confirmed",
    text: "La tienda está preparando tu orden",
    icon:
      "https://firebasestorage.googleapis.com/v0/b/genial-core-212201.appspot.com/o/cafe.png?alt=media&token=de0e1726-4d8a-4f9d-9215-7cae7f54526c",
  },
  {
    value: "rider-at-partner",
    text: "El Piiddo Rider llegó a la tienda",
    icon:
      "https://firebasestorage.googleapis.com/v0/b/genial-core-212201.appspot.com/o/delivery-man%20(1).png?alt=media&token=e3d630d6-e076-45b6-97c1-4efe7032b1ea",
  },
  {
    value: "order-taken",
    text: "El Piddo Rider recogió tu orden y va hacia la dirección de entrega",
    icon:
      "https://firebasestorage.googleapis.com/v0/b/genial-core-212201.appspot.com/o/delivery-man%20(1).png?alt=media&token=e3d630d6-e076-45b6-97c1-4efe7032b1ea",
  },
  {
    value: "order-completed",
    text: "El pedido ha sido entregado",
    icon:
      "https://firebasestorage.googleapis.com/v0/b/genial-core-212201.appspot.com/o/kid-and-baby.png?alt=media&token=51320f91-6023-4425-ae89-7f9dd7110939",
  },
];

const ETA = () => {
  const [currentState, setCurrentState] = useState(0);

  useInterval(() => {
    if (currentState + 1 < states.length) {
      setCurrentState(currentState + 1);
    }
  }, 5000);

  return (
    <>
      <ShopHeader />

      <EtaWrapper>
        <GoogleMaps
          storeLocation={storeLocation}
          customerLocation={customerLocation}
          riderLocation={currentState >= 3 ? riderLocation : null}
          containerElement={<MapWrapperStyled />}
          mapElement={<div style={{ height: `100%` }} />}
        />

        <NotificationsWrapper>
          <div>
            <ETAIcon state={states[currentState].value}>
              <img src={states[currentState].icon} />
            </ETAIcon>

            <RightContent>
              <Time>Quedan 40 minutos</Time>

              <StateText>{states[currentState].text}</StateText>

              <ProgressSteps>
                {states.map((s, index) => {
                  return (
                    <StepWrapper>
                      <Step
                        color={index <= currentState ? "#f74342" : "#ddd"}
                      />
                      <CheckIconWrapper
                        color={index <= currentState ? "#f74342" : "#ddd"}
                      >
                        <FontAwesomeIcon icon="check" />
                      </CheckIconWrapper>
                    </StepWrapper>
                  );
                })}
              </ProgressSteps>
            </RightContent>
          </div>
        </NotificationsWrapper>
      </EtaWrapper>
    </>
  );
};

export default ETA;
