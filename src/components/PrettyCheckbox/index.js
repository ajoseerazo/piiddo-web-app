import React from "react";
import { CheckboxStyled } from "./styled";

const PrettyCheckbox = ({ label, rightLabel, onChange }) => {
  return (
    <CheckboxStyled className="pretty p-curve p-icon p-thick  p-smooth">
      <input type="checkbox" onChange={onChange} />
      <div className="state p-danger">
        <i className="icon fa fa-check"></i>
        <label>
          <span>{label}</span>
          <span>{rightLabel && <span>{rightLabel}</span>}</span>
        </label>
      </div>
    </CheckboxStyled>
  );
};

export default PrettyCheckbox;
