import React, { useState, useCallback, useRef } from "react";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "./utils";
import Cards from "react-credit-cards";
import InputStyled from "../InputStyled";
import { FormStyled, CreditCardFormWrapper } from "./styled";

const CreditCardForm = ({ onChange }) => {
  const [cvc, setCVC] = useState("");
  const [expiry, setExpiry] = useState("");
  const [focus, setFocus] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [issuer, setIssuer] = useState("");

  let form = useRef();

  const handleInputChange = useCallback(
    ({ target }) => {
      if (target.name === "number") {
        target.value = formatCreditCardNumber(target.value);
      } else if (target.name === "expiry") {
        target.value = formatExpirationDate(target.value);
      } else if (target.name === "cvc") {
        target.value = formatCVC(target.value);
      }

      switch (target.name) {
        case "cvc":
          setCVC(target.value);
          break;
        case "number":
          setNumber(target.value);
          break;
        case "expiry":
          setExpiry(target.value);
          break;
        case "name":
          setName(target.value);
          break;
        case "billName":
          setBillName(target.value);
          break;
        case "billAddress":
          setBillAddress(target.value);
          break;
        case "billDocumentNumber":
          setBillDocumentNumber(target.value);
          break;
        case "billDocumentType":
          setBillDocumentType(target.value);
          break;
        case "billEmail":
          setBillEmail(target.value);
          break;
        case "billLastName":
          setBillLastName(target.value);
          break;
      }

      onChange({
        cvc,
        expiry,
        name,
        number,
      });
    },
    [cvc, expiry, name, number]
  );

  const handleInputFocus = useCallback(
    ({ target }) => {
      setFocus(target.name);
    },
    [setFocus]
  );

  return (
    <CreditCardFormWrapper>
      <Cards
        cvc={cvc}
        expiry={expiry}
        focused={focus}
        name={name}
        number={number}
      />
      <FormStyled ref={form}>
        <div className="form-group">
          <InputStyled
            type="tel"
            name="number"
            className="form-control w-full"
            placeholder="Número de tarjeta"
            pattern="[\d| ]{16,22}"
            required
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            inspectletIgnore
          />
        </div>
        <div className="form-group">
          <InputStyled
            type="text"
            name="name"
            className="form-control w-full"
            placeholder="Nombre"
            required
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            inspectletIgnore
          />
        </div>
        <div className="row">
          <div className="col-6">
            <InputStyled
              type="tel"
              name="expiry"
              className="form-control w-full"
              placeholder="Fecha de vencimiento"
              pattern="\d\d/\d\d"
              required
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              inspectletIgnore
            />
          </div>
          <div className="col-6">
            <InputStyled
              type="tel"
              name="cvc"
              className="form-control w-full"
              placeholder="CVC"
              pattern="\d{3,4}"
              required
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              inspectletIgnore
            />
          </div>
        </div>
        <InputStyled type="hidden" name="issuer" value={issuer} />
      </FormStyled>
    </CreditCardFormWrapper>
  );
};

export default CreditCardForm;
