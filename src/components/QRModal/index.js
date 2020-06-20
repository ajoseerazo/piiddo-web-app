import React, { useEffect } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  ModalStyled,
  ModalBodyStyled,
  CloseButton,
  QrWrapper,
  PStyled,
  LogoRemepagos,
  ButtonStyled,
} from "./styled";
import QRCode from "react-qr-code";

library.add([faTimes]);

const QRModal = ({ isOpened, orderId, onCloseModal, amount }) => {
  useEffect(() => {
    if (isOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpened]);

  return (
    <ModalStyled isOpen={isOpened}>
      <ModalBodyStyled>
        <CloseButton onClick={onCloseModal}>
          <FontAwesomeIcon icon="times" />
        </CloseButton>

        <LogoRemepagos src="https://firebasestorage.googleapis.com/v0/b/genial-core-212201.appspot.com/o/logo-remepagos.png?alt=media&token=403f7604-e597-42d0-b419-94617abbbceb" />

        <PStyled>Lee el código QR con Remepagos para completar el pago</PStyled>

        <QrWrapper>
          <QRCode value="remepagos://code=573208664593" />
        </QrWrapper>

        <PStyled>
          O puedes hacer click en el siguiente botón si estás en un dispositivo móvil
        </PStyled>

        <a href={`remepagos://pay/+573208664593?amount=${amount}`} target="_blank">
          <ButtonStyled>Pagar con mi app Remepagos</ButtonStyled>
        </a>
      </ModalBodyStyled>
    </ModalStyled>
  );
};

export default QRModal;
