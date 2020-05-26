import ContentLoader from "react-content-loader";
import {
  PlaceholderWrapper,
  ItemPlaceholderWrapper,
} from "./placeholder.styled";

const ItemPlaceholder = () => {
  return (
    <ContentLoader
      width="50"
      height="30"
      backgroundColor="rgba(229,237,239,.35)"
    >
      <rect x="0" y="0" rx="8" ry="8" width="50" height="30" />
    </ContentLoader>
  );
};

const Placeholder = ({ rows = 1, children, ready }) => {
  const arr = [];

  for (let i = 0; i < rows; i++) {
    arr.push(null);
  }

  if (!ready) {
    return (
      <PlaceholderWrapper>
        {arr.map((a, index) => (
          <ItemPlaceholderWrapper key={index}>
            <ItemPlaceholder />
          </ItemPlaceholderWrapper>
        ))}
      </PlaceholderWrapper>
    );
  } else {
    return <>{children}</>;
  }
};

export default Placeholder;
