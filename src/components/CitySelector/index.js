import React, { useState, useCallback, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCity, faChevronCircleDown } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import CityModal from "../CityModal";
import appActions from "../../redux/actions/app";
import { useDispatch, useSelector } from "react-redux";
import { CITIES_LABELS } from "../../utils/constants";
import { useRouter } from "next/router";
import useCity from "../../hooks/useCity";

library.add([faCity, faChevronCircleDown]);

import { CitySelectorWrapper } from "./styled";

const CitySelector = ({ disabled }) => {
  const router = useRouter();

  const [innerCity, setInnerCity] = useState();

  const city = useCity();

  const [modalOpened, setModalOpened] = useState(false);

  const dispatch = useDispatch();

  const toggleModal = useCallback(() => {
    if (modalOpened && !innerCity && !city) {
      onSelectCity("merida");
    }
    setModalOpened(!modalOpened);
  }, [modalOpened, city, innerCity]);

  useEffect(() => {
    if (city === undefined) {
      setModalOpened(true);
    }
  }, [city]);

  useEffect(() => {
    dispatch(appActions.initApp());
  }, []);

  const onSelectCity = useCallback((city) => {
    const params = window.location.pathname.split("/");
    params[1] = city;
    const newPath = params.join("/");

    router.push(router.pathname, newPath, {
      shallow: true,
    });

    setInnerCity(city);
    dispatch(appActions.selectCity(city));
  }, []);

  return (
    <>
      <CitySelectorWrapper onClick={!disabled ? toggleModal : undefined}>
        <FontAwesomeIcon icon="city" color="#f74342" />

        <span>{!city ? "Selecciona tu ciudad" : CITIES_LABELS[city].name}</span>

        {!disabled && <FontAwesomeIcon className="chevron-icon" icon="chevron-down" />}
      </CitySelectorWrapper>

      <CityModal
        isOpen={modalOpened}
        onCloseModal={toggleModal}
        onSelectCityHandler={onSelectCity}
      />
    </>
  );
};

export default CitySelector;
