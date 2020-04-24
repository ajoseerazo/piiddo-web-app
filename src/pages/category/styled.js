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
`;

export const ContentWrapper = styled.div`
  flex: 1;
  border-radius: 12px;
  padding: 30px 20px;
  background: #FFF;
  margin-left: 20px;
  min-height: 600px;

  h1 {
    font-weight: 600;
    font-family: 'Poppins';
    font-size: 20px;
    margin-bottom: 30px;

    span {
      display: flex;
      align-items: center;
    }
  }
`;

export const SidebarWrapper = styled.div`
  width: 256px;
`;

export const RestaurantsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  a {
    color: black;
    text-decoration: none;
  }
`;

export const ChevronRightIcon = styled.span`
  font-weight: 100;
  color: red;
  font-size: 30px;
  margin-left: 10px;
  margin-right: 10px;
`;