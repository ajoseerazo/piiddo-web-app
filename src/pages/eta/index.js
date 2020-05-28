import { useState, useEffect, useRef } from "react";
import ShopHeader from "../../components/ShopHeader/ShopHeader";
import GoogleMaps from "../../components/GoogleMaps";
import { EtaWrapper } from "./styled";

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
  },
  {
    value: "confirming-order-with-partner",
    text: "Estamos confirmando la orden con la tienda",
  },
  {
    value: "order-confirmed",
    text: "La tienda está preparando tu orden",
  },
  {
    value: "rider-at-partner",
    text: "El Piiddo Rider llegó a la tienda",
  },
  {
    value: "order-taken",
    text: "El Piddo Rider recogió tu orden y va hacia la dirección de entrega",
  },
  {
    value: "order-completed",
    text: "El pedido ha sido entregado",
  },
];

let cs = 0;

const ETA = () => {
  const [currentState, setCurrentState] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [interval, setInterv] = useState();

  /*const upd = () => {
    if (cs + 1 < states.length) {
      console.log("Entra");
      setCurrentState(currentState + 1);
      cs++;
    } else {
      clearInterval(interval);
    }
  };

  const updateState = () => {
    setInterv(setInterval(upd, 5000));
  };

  useEffect(() => {
    if (!mounted) {
      setMounted(true);

      updateState();
    }
  }, [mounted]);*/

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
          containerElement={<div style={{ height: `calc(100vh - 70px)` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />

        <div
          style={{
            backgroundColor: "white",
            position: "fixed",
            bottom: 15,
            left: 15,
            padding: 20,
            borderRadius: 8,
            boxShadow: "0 6px 10px 0 rgba(128,98,96,0.16)",
            width: 300,
            height: 120,
            fontSize: 14,
          }}
        >
          <div>{states[currentState].text}</div>

          <div
            style={{
              display: "flex",
            }}
          >
            {states.map((s, index) => {
              return (
                <div
                  style={{
                    width: 56,
                    height: 2,
                    marginRight: 4,
                    background: index <= currentState ? "#f74342" : "#ddd",
                  }}
                ></div>
              );
            })}
          </div>
        </div>
      </EtaWrapper>
    </>
  );
};

export default ETA;
