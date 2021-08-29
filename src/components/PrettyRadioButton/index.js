import React from "react";
import { CheckboxStyled } from "./styled";
import "pretty-checkbox/src/pretty-checkbox.scss";

const PrettyRadioButton = ({
  label,
  rightLabel,
  onChange,
  checked,
  disabled,
  name,
  image,
}) => {
  return (
    <CheckboxStyled className="pretty p-default p-round p-smooth">
      <input
        type="radio"
        onChange={onChange}
        name={name || "p-r-b"}
        checked={checked}
        disabled={disabled}
      />
      <div className="state p-danger">
        <label>
          <span>
            <span>{label}</span>
            {image && <img src={image} />}
          </span>
          <span>{rightLabel && <span>{rightLabel}</span>}</span>
        </label>
      </div>
    </CheckboxStyled>
  );
};

export default PrettyRadioButton;
