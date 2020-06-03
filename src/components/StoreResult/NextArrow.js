import { ArrowWrapper } from "./styled";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

library.add([faChevronRight]);

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <ArrowWrapper
      className={className}
      style={{
        ...style,
        marginRight: -10,
      }}
      onClick={onClick}
    >
      <FontAwesomeIcon icon="chevron-right" color="#333" />
    </ArrowWrapper>
  );
};

export default NextArrow;
