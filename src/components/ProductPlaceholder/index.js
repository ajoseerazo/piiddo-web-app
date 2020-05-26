import {
  PlaceholderWrapper,
  DesktopPlaceholder,
  MobilePlaceholder,
} from "./styled";
import ContentLoader from "react-content-loader";

const ProductPlaceholder = () => {
  return (
    <PlaceholderWrapper>
      <DesktopPlaceholder>
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
      </DesktopPlaceholder>

      <MobilePlaceholder>
        <ContentLoader
          width="100%"
          height="230px"
          backgroundColor="rgba(229,237,239,.35)"
        >
          <rect x="0" y="0" rx="8" ry="8" width="100%" height="160px" />

          <rect x="0" y="170px" rx="8" ry="8" width="50%" height="12" />

          <rect x="0" y="215px" rx="8" ry="8" width="20%" height="12" />
        </ContentLoader>
      </MobilePlaceholder>
    </PlaceholderWrapper>
  );
};

export default ProductPlaceholder;
