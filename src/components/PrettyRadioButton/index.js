import React from "react";
import { CheckboxStyled } from "./styled";

const PrettyRadioButton = ({ label, rightLabel, onChange }) => {
  return (
    <CheckboxStyled className="pretty p-default p-round p-smooth">
      <input type="radio" onChange={onChange} name="p-r-b" />
      <div className="state p-danger">
        <label>
          <span>{label}</span>
          <span>{rightLabel && <span>{rightLabel}</span>}</span>
        </label>
      </div>
    </CheckboxStyled>
  );
};

export default PrettyRadioButton;
