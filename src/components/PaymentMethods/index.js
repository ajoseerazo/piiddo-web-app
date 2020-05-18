import React, { useCallback, useState } from "react";
import PrettyRadioButton from "../PrettyRadioButton";
import { PaymentMethodsWrapper } from "./styled";

const paymentMethods = [
  {
    name: "Piiddo Créditos",
    value: "piiddo-credits",
  },
  {
    name: "Bolívares en efectivo",
    icon: "cash",
    value: "cash-bs",
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
  },
  {
    name: "Transferencia bancaria",
    value: "bank-transfer",
  },
  {
    name: "Zelle",
    value: "zelle",
  },
  {
    name: "Paypal",
    value: "paypal",
  },
  {
    name: "Tarjeta de débito internacional",
    value: "tdb",
  },
  {
    name: "Tarjeta de crédito internacional",
    value: "tdc",
  },
  {
    name: "Bitcoins",
    value: "bitcoin",
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

  console.log(paymentMethodSelected);

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
          />
        </li>
      ))}
    </PaymentMethodsWrapper>
  );
};

export default PaymentMethods;
