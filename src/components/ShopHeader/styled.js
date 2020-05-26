import styled from "styled-components";

export const BackButtonWrapper = styled.div`
  position: absolute;
  left: 0px;
  width: 50px;
  display: none;
  justify-content: center;
  align-items: center;
  height: 100%;

  @media screen and (max-width: 768px) {
    display: flex;
  } 
`;
