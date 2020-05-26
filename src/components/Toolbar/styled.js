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
  z-index: 1000;
  justify-content: space-around;

  @media screen and (max-width: 768px) {
    display: flex;
  }
`;
