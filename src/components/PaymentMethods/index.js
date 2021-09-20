import React, { useCallback, useState } from "react";
import PrettyRadioButton from "../PrettyRadioButton";
import { PaymentMethodsWrapper } from "./styled";

const paymentMethods = [
  {
    name: "Remepagos",
    value: "remepagos",
    disabled: false,
  },
  {
    name: "SLP",
    value: "slp",
    disabled: false,
    image: "https://apklatestversion.com/logo/axie-infinity-apk.png",
  },
  {
    name: "Piiddo Créditos",
    value: "piiddo-credits",
    disabled: true,
  },
  {
    name: "Tarjeta de crédito/débito internacional",
    value: "credit-card",
    disabled: true,
  },
  {
    name: "Bolívares en efectivo",
    icon: "cash",
    value: "cash-bs",
    disabled: false,
  },
  {
    name: "Dólares/Euros en efectivo",
    icon: "cash",
    value: "cash-usd",
  },
  {
    name: "Pago móvil",
    icon: "wire",
    value: "pago-movil",
    disabled: false,
  },
  {
    name: "Transferencia bancaria",
    value: "bank-transfer",
    disabled: false,
  },
  {
    name: "Zelle",
    value: "zelle",
  },
  {
    name: "Paypal",
    value: "paypal",
    disabled: false,
  },
  {
    name: "Criptomonedas",
    value: "cryptocoins",
    disabled: false,
  },
];

const PaymentMethods = ({ onSelectOption, value }) => {
  const [paymentMethodSelected, setPaymetnMethodSelected] = useState(value);

  const onSelectOptionCb = useCallback(
    (paymentMethod) => {
      setPaymetnMethodSelected(paymentMethod);
      onSelectOption(paymentMethod);
    },
    [paymentMethodSelected, onSelectOption, value]
  );

  return (
    <PaymentMethodsWrapper>
      {paymentMethods.map((pm, index) => (
        <li key={index}>
          <PrettyRadioButton
            label={pm.name}
            onChange={onSelectOptionCb.bind(this, pm)}
            checked={
              paymentMethodSelected
                ? pm.value === paymentMethodSelected.value
                : false
            }
            disabled={pm.disabled}
            image={pm.image}
          />
        </li>
      ))}
    </PaymentMethodsWrapper>
  );
};

export default PaymentMethods;
