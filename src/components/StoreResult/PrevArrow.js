import { ArrowWrapper } from "./styled";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <ArrowWrapper
      className={className}
      style={{
        ...style,
        marginLeft: -20,
      }}
      onClick={onClick}
    >
      <FontAwesomeIcon icon="chevron-left" color="#333" />
    </ArrowWrapper>
  );
};

export default PrevArrow;
