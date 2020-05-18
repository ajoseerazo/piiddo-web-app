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
    name: "Dólares en efectivo",
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

const PaymentMethods = () => {
  return (
    <PaymentMethodsWrapper>
      {paymentMethods.map((pm, index) => (
        <li key={index}>
          <PrettyRadioButton label={pm.name} />
        </li>
      ))}
    </PaymentMethodsWrapper>
  );
};

export default PaymentMethods;
