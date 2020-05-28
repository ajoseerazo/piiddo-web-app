import styled from "styled-components";

export const EtaWrapper = styled.div`
  margin-top: 70px;

  @media screen and (max-width: 768px) {
    margin-top: 50px;
  }
`;

export const MapWrapperStyled = styled.div`
  height: calc(100vh - 70px);

  @media screen and (max-width: 768px) {
    height: calc(100vh - 50px);
  }
`;
