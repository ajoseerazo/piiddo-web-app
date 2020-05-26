import styled from "styled-components";

export const PlaceholderWrapper = styled.div`
  width: 100%;
`;

export const DesktopPlaceholder = styled.div`
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const MobilePlaceholder = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;
