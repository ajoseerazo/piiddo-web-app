import React, { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCity, faChevronCircleDown } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import CityModal from "../CityModal";
import appActions from "../../redux/actions/app";
import { useDispatch, useSelector } from "react-redux";
import { CITIES_LABELS } from "../../utils/constants";
import { useRouter } from "next/router";

library.add([faCity, faChevronCircleDown]);

import { CitySelectorWrapper } from "./styled";

const CitySelector = () => {
  const router = useRouter();
  const { city } = router.query;

  const { city: cityState } = useSelector((state) => state.App);
  const [modalOpened, setModalOpened] = useState(!city || city === "not-set");

  const dispatch = useDispatch();

  const toggleModal = useCallback(() => {
    setModalOpened(!modalOpened);
  }, [modalOpened]);

  const onSelectCity = useCallback((city) => {
    const params = router.asPath.split("/");
    params[1] = city;
    const newPath = params.join("/");

    router.push(router.pathname, newPath, {
      shallow: true,
    });

    dispatch(appActions.selectCity(city));
  }, []);

  return (
    <>
      <CitySelectorWrapper onClick={toggleModal}>
        <FontAwesomeIcon icon="city" color="#f74342" />

        <span>
          {!cityState || cityState === "not-set"
            ? !city || city === "not-set"
              ? "Selecciona tu ciudad"
              : CITIES_LABELS[city].name
            : CITIES_LABELS[cityState].name}
        </span>

        <FontAwesomeIcon icon="chevron-down" />
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
