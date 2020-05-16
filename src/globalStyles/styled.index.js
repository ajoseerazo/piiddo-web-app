import styled from "styled-components";

export const MainContainerWrapper = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 40px;

  @media screen and (max-width: 768px) {
    padding: 0px !important;
    margin: 0px !important;

    > .section-name {
      font-size: 16px;
      padding: 0px;
      line-height: 25px;
    }
  }
`;
