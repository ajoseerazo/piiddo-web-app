import React, { useEffect, useState } from "react";
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
import Link from "next/link";

const CityModal = ({ isOpen, onCloseModal }) => {
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

  return (
    <ModalStyled isOpen={isOpen} toggle={onCloseModal}>
      <ModalBodyStyled>
        <CloseButton onClick={onCloseModal}>
          <FontAwesomeIcon icon="times" />
        </CloseButton>

        <ModalTitle>Selecciona tu ciudad</ModalTitle>

        <Scrollbars autoHeight autoHeightMin={100} autoHeightMax={height}>
          <CityList>
            {/*<Link href={"/[city]"} as={"/merida"}>
              <a>*/}
            <CityItem onClick={onCloseModal}>Mérida</CityItem>
            {/*</CityList></a>
            </Link>*/}
            {/*<Link href={"/[city]"} as={"/barquisimeto"}>
              <a>*/}
            <CityItem onClick={onCloseModal}>Barquisimeto - Cabudare</CityItem>
            {/*</a>
            </Link>
            {/*<Link href={"/[city]"} as={"/maracaibo"}>
              <a>*/}
            <CityItem onClick={onCloseModal}>Maracaibo</CityItem>
            {/*</a>
            </Link>*/}
            {/*<Link href={"/[city]"} as={"/caracas"}>
              <a>*/}
            <CityItem onClick={onCloseModal}>Caracas</CityItem>
            {/*</a>
            </Link>*/}

            {/*<Link href={"/[city]"} as={"/san-cristobal"}>
              <a>*/}
            <CityItem onClick={onCloseModal}>San Cristóbal</CityItem>
            {/*</a>
            </Link>*/}

            {/*<Link href={"/[city]"} as={"/valencia"}>
              <a>*/}
            <CityItem onClick={onCloseModal}>Valencia</CityItem>
            {/*</a>
            </Link>*/}

            {/*<Link href={"/[city]"} as={"/barinas"}>
              <a>*/}
            <CityItem onClick={onCloseModal}>Barinas</CityItem>
            {/*</a>
            </Link>*/}

            {/*<Link href={"/[city]"} as={"/guanare"}>
              <a>*/}
            <CityItem onClick={onCloseModal}>Guanare</CityItem>
            {/*</a>
            </Link>*/}
          </CityList>
        </Scrollbars>
      </ModalBodyStyled>
    </ModalStyled>
  );
};

export default CityModal;
