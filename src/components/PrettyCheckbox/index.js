import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { CheckboxStyled } from "./styled";

library.add([faCheck]);

const PrettyCheckbox = ({ label, rightLabel, onChange }) => {
  return (
    <CheckboxStyled className="pretty p-curve p-icon p-thick  p-smooth">
      <input type="checkbox" onChange={onChange} />
      <div className="state p-danger">
        <FontAwesomeIcon icon="check" />
        <label>
          <span>{label}</span>
          <span>{rightLabel && <span>{rightLabel}</span>}</span>
        </label>
      </div>
    </CheckboxStyled>
  );
};

export default PrettyCheckbox;
