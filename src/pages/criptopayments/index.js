import PaymentSuccessScreen from "../../components/PaymentSuccessScreen";
import { Wrapper } from "./styled";

const CriptopaymentsPage = () => {
  return (
    <Wrapper>
      <PaymentSuccessScreen redirect={false} title={"Pago recibido exitosamente"} />
    </Wrapper>
  );
};

export default CriptopaymentsPage;
