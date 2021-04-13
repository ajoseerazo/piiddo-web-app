import React, { useCallback, useState } from "react";
import PrettyRadioButton from "../PrettyRadioButton";
import { PaymentMethodsWrapper } from "./styled";

const paymentMethods = [
  {
    name: "Piiddo Créditos",
    value: "piiddo-credits",
    disabled: true,
  },
  {
    name: "Remepagos",
    value: "remepagos",
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
    disabled: true,
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
    [paymentMethodSelected]
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
          />
        </li>
      ))}
    </PaymentMethodsWrapper>
  );
};

export default PaymentMethods;
