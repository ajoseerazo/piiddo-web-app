import styled from "styled-components";

export const PlaceholderWrapper = styled.div`
  width: 100%;
  padding: 10px;
  background: white;
  border-radius: 8px;

  @media screen and (max-width: 768px) {
  }
`;

export const DesktopPlaceholder = styled.div`
`;

export const MobilePlaceholder = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;