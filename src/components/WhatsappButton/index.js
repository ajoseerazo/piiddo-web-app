import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { WhatsappButtonWrapper, WhatsappButtonStyled } from "./styled";

library.add([faWhatsapp]);

const WhatsappButton = ({ phone, text, msg }) => {
  return (
    <>
      <WhatsappButtonWrapper
        href={`https://api.whatsapp.com/send?phone=${phone}&text=${text}`}
        target="_blank"
        className="whatsapp-button-wrapper"
      >
        <WhatsappButtonStyled>
          <FontAwesomeIcon icon={["fab", "whatsapp"]} size="2x" />
          <p>{msg}</p>
        </WhatsappButtonStyled>
      </WhatsappButtonWrapper>
    </>
  );
};

export default WhatsappButton;
