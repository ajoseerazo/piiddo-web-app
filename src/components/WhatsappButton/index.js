import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import "./styles.scss";

library.add([faWhatsapp]);

const WhatsappButton = ({ phone, text, msg }) => {
  return (
    <>
      <a
        href={`https://api.whatsapp.com/send?phone=${phone}&text=${text}`}
        target="_blank"
        className="whatsapp-button-wrapper"
      >
        <button className="whatsapp-button">
          <FontAwesomeIcon icon={["fab", "whatsapp"]} size="2x" />
          <p>{msg}</p>
        </button>
      </a>
    </>
  );
};

export default WhatsappButton;
