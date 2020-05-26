import { PlaceholderWrapper } from "./styled";
import ContentLoader from "react-content-loader";

const PartnerBannerPlaceholder = ({ ready, children }) => {
  if (!ready) {
    return (
      <PlaceholderWrapper>
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
      </PlaceholderWrapper>
    );
  } else {
    return <>{children}</>;
  }
};

export default PartnerBannerPlaceholder;
