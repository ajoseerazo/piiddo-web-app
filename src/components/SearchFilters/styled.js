import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: white;
  font-family: "Poppins";
  padding: 15px 0px 15px;
  animation: height 1s ease-in-out;
  border-radius: 12px;
  overflow-y: hidden;
  height: 100%;
`;

export const FilterTitle = styled.div`
  font-weight: 600;
  margin-left: 15px;
  margin-right: 15px;
`;

export const FiltersContent = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    padding: 10px 20px;
    font-size: 14px;
    cursor: pointer;
    border-left: 2px solid white;

    &:hover,
    &.active {
      border-left: 2px solid #f74342;
    }
  }
`;
