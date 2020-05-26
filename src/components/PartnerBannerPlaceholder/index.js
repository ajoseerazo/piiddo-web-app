import {
  PlaceholderWrapper,
  DesktopPlaceholder,
  MobilePlaceholder,
} from "./styled";
import ContentLoader from "react-content-loader";

const PartnerBannerPlaceholder = ({ ready, children }) => {
  if (!ready) {
    return (
      <PlaceholderWrapper>
        <DesktopPlaceholder>
          <ContentLoader
            width="100%"
            height="140px"
            backgroundColor="rgba(229,237,239,.35)"
          >
            {/* Only SVG shapes */}
            <rect x="0" y="0" rx="8" ry="8" width="340px" height="140px" />
            <rect x="350px" y="10" rx="8" ry="8" width="200px" height="12" />
            <rect x="350px" y="30" rx="8" ry="8" width="200px" height="12" />

            <rect x="350px" y="50" rx="8" ry="8" width="180px" height="12" />
          </ContentLoader>
        </DesktopPlaceholder>

        <MobilePlaceholder>
          <ContentLoader
            width="100%"
            height="330px"
            backgroundColor="rgba(229,237,239,.35)"
          >
            {/* Only SVG shapes */}
            <rect x="0" y="0" rx="0" ry="0" width="100%" height="220px" />
            <rect x="15px" y="240px" rx="8" ry="8" width="calc(100% - 30px)" height="12" />
            <rect x="40px" y="270px" rx="8" ry="8" width="calc(100% - 80px)" height="12" />
            <rect x="30px" y="300px" rx="8" ry="8" width="calc(100% - 60px)" height="12" />
          </ContentLoader>
        </MobilePlaceholder>
      </PlaceholderWrapper>
    );
  } else {
    return <>{children}</>;
  }
};

export default PartnerBannerPlaceholder;
