import styled from "styled-components";

export const HomeWrapper = styled.div`
  margin-top: 70px;
  padding-top: 20px;
  background: #fafaf8;
  position: relative;
  padding-bottom: 50px;

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

export const ContentWrapper = styled.div`
  flex: 1;
  border-radius: 12px;
  padding: 30px 20px;
  background: #fff;
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

export const SidebarWrapper = styled.div`
  width: 256px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const RestaurantsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  a {
    color: black;
    text-decoration: none;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    padding: 0px 15px;
    grid-gap: 12px;
  }
`;

export const ChevronRightIcon = styled.span`
  font-weight: 100;
  color: red;
  font-size: 30px;
  margin-left: 10px;
  margin-right: 10px;
`;

export const TopCategoriesWrapper = styled.div`
  position: fixed;
  top: 48px;
  z-index: 1020;
  display: none;
  border-bottom: 1px solid #e5edef;

  @media screen and (max-width: 768px) {
    display: block;
    width: 100%;
  }
`;
