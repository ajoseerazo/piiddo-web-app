import styled from "styled-components";

export const SearchPageWrapper = styled.div`
  margin-top: 70px;
  padding-top: 20px;
  background: #fafaf8;
  position: relative;
  padding-bottom: 50px;
  min-height: calc(100vh - 70px);

  > div {
    max-width: 1240px;
    display: flex;
    flex-direction: row;
    padding-left: 20px;
    padding-right: 20px;
    margin: 0 auto;
  }

  @media screen and (max-width: 768px) {
    margin-top: 100px;
    min-height: calc(100vh - 100px);

    > div {
      padding: 0px;
    }
  }
`;

export const FiltersWrapper = styled.div`
  width: 256px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const ContentWrapper = styled.div`
  flex: 1;
  padding: 30px 20px;
  margin-left: 20px;

  h1 {
    font-weight: 600;
    font-family: "Poppins";
    font-size: 20px;
    margin-bottom: 30px;

    span {
      display: flex;
      align-items: center;
    }
  }

  @media screen and (max-width: 768px) {
    margin: 0px;
    width: 100%;

    h1  {
      line-height: 25px;
      position: sticky;
      top: 96px;
      background: white;
      padding-bottom: 8px;
      padding-top: 8px;
      font-size: 16px;
    }
  }
`;

export const ResultsTitle = styled.div`
  font-size: 28px;
  font-weight: 600;
`;