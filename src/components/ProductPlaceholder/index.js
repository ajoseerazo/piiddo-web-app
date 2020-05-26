import { PlaceholderWrapper } from "./styled";
import ContentLoader from "react-content-loader";

const ProductPlaceholder = () => {
  return (
    <PlaceholderWrapper>
      <ContentLoader
        width="100%"
        height="80"
        backgroundColor="rgba(229,237,239,.35)"
      >
        {/* Only SVG shapes */}
        <rect x="0" y="0" rx="8" ry="8" width="128" height="80" />
        <rect
          x="135"
          y="22"
          rx="8"
          ry="8"
          width="calc(90% - 135px)"
          height="12"
        />
        <rect
          x="135"
          y="44"
          rx="8"
          ry="8"
          width="calc(100% - 135px)"
          height="12"
        />
      </ContentLoader>
    </PlaceholderWrapper>
  );
};

export default ProductPlaceholder;
