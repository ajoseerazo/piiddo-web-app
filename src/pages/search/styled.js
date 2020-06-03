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
    margin-top: 50px;
    min-height: calc(100vh - 50px);
    padding-top: 0px;

    > div {
      padding: 0px;
      flex-direction: column;
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
  width: calc(100% - 256px);
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
    padding: 0px;

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

  @media screen and (max-width: 768px) {
    padding: 15px 20px 10px;
    font-size: 16px;
  }
`;

export const MobileSearchWrapper = styled.div`
  display: none;
  background: white;
  padding: 10px;
  position: sticky;
  top: 50px;
  z-index: 1000;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;
