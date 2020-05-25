import PartnerPlaceholder from "../PartnerPlaceholder";
import { PartnersPlaceholderWrapper } from "./styled";

const PartnersPlaceholder = ({ rows = 1, children, ready }) => {
  const arr = [];

  for (let i = 0; i < rows; i++) {
    arr.push(null);
  }

  if (!ready) {
    return (
      <PartnersPlaceholderWrapper>
        {arr.map((a, index) => (
          <PartnerPlaceholder />
        ))}
      </PartnersPlaceholderWrapper>
    );
  } else {
    return <>{children}</>;
  }
};

export default PartnersPlaceholder;
