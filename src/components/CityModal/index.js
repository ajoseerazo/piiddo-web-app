import React, { useEffect, useState, useCallback } from "react";
import {
  ModalStyled,
  ModalBodyStyled,
  ModalTitle,
  CityList,
  CityItem,
  CloseButton,
} from "./styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Scrollbars } from "react-custom-scrollbars";

const CityModal = ({ isOpen, onCloseModal, onSelectCityHandler }) => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [isOpen]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth > 768) {
        setHeight("calc(100vh - 130px)");
      } else {
        setHeight(300);
      }
    }
  }, []);

  const onSelectCity = useCallback((city) => {
    onSelectCityHandler(city);
  }, []);

  return (
    <ModalStyled isOpen={isOpen} toggle={onCloseModal}>
      <ModalBodyStyled>
        <CloseButton onClick={onCloseModal}>
          <FontAwesomeIcon icon="times" />
        </CloseButton>

        <ModalTitle>Selecciona tu ciudad</ModalTitle>

        <Scrollbars autoHeight autoHeightMin={100} autoHeightMax={height}>
          <CityList>
            <a
              href="/merida"
              onClick={(e) => {
                e.preventDefault();

                onSelectCity("merida");
              }}
            >
              <CityItem onClick={onCloseModal}>Mérida</CityItem>
            </a>
            <a
              href="/barquisimeto"
              onClick={(e) => {
                e.preventDefault();

                onSelectCity("barquisimeto");
              }}
            >
              <CityItem onClick={onCloseModal}>
                Barquisimeto - Cabudare
              </CityItem>
            </a>
            <a
              href="/maracaibo"
              onClick={(e) => {
                e.preventDefault();

                onSelectCity("maracaibo");
              }}
            >
              <CityItem onClick={onCloseModal}>Maracaibo</CityItem>
            </a>
            <a
              href="/caracas"
              onClick={(e) => {
                e.preventDefault();

                onSelectCity("caracas");
              }}
            >
              <CityItem onClick={onCloseModal}>Caracas</CityItem>
            </a>

            <a
              href="/san-cristobal"
              onClick={(e) => {
                e.preventDefault();

                onSelectCity("san-cristobal");
              }}
            >
              <CityItem onClick={onCloseModal}>San Cristóbal</CityItem>
            </a>

            <a
              href="/valencia"
              onClick={(e) => {
                e.preventDefault();

                onSelectCity("valencia");
              }}
            >
              <CityItem onClick={onCloseModal}>Valencia</CityItem>
            </a>

            <a
              href="/barinas"
              onClick={(e) => {
                e.preventDefault();

                onSelectCity("barinas");
              }}
            >
              <CityItem onClick={onCloseModal}>Barinas</CityItem>
            </a>

            <a
              href="/guanare"
              onClick={(e) => {
                e.preventDefault();

                onSelectCity("guanare");
              }}
            >
              <CityItem onClick={onCloseModal}>Guanare</CityItem>
            </a>
          </CityList>
        </Scrollbars>
      </ModalBodyStyled>
    </ModalStyled>
  );
};

export default CityModal;
