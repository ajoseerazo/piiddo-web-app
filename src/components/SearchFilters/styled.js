import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: white;
  font-family: "Poppins";
  padding: 15px 0px 15px;
  animation: height 1s ease-in-out;
  border-radius: 12px;
  overflow-y: hidden;
  height: 100%;

  @media screen and (max-width: 768px) {
    padding: 0px;
    border-radius: 0px;
    position: fixed;
    top: 100px;
    z-index: 1000;
    height: 43px;
    width: 100%;
  }
`;

export const FilterTitle = styled.div`
  font-weight: 600;
  margin-left: 15px;
  margin-right: 15px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const FiltersContent = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 15px;

  li {
    padding: 10px 20px;
    font-size: 14px;
    cursor: pointer;
    border-left: 2px solid white;

    &:hover,
    &.active {
      border-left: 2px solid #f74342;
      font-weight: 600;
    }
  }

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: row;
    margin-top: 0px;

    li {
      flex: 1;
      border-left: 0px;
      text-align: center;
      border-bottom: 2px solid #fff;

      &:hover,
      &.active {
        border-left: 0px;
        font-weight: 600;
        border-bottom: 2px solid #f74342;
      }
    }
  }
`;
