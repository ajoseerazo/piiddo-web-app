import styled from "styled-components";

export const ToolbarWrapper = styled.div`
  display: none;
  height: 50px;
  bottom: 0px;
  width: 100%;
  align-items: center;
  position: fixed;
  background: white;
  border-top: 1px solid #e5edef;
  z-index: 1029;
  justify-content: space-around;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  padding: 6px 0px;

  @media screen and (max-width: 768px) {
    display: flex;
  }
`;

export const MenuItemWrapper = styled.div`
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;