import styled from "styled-components";

export const MobileSearchModalWrapper = styled.div`
  height: 100%;
  width: 100%;
  background: white;
  z-index: 1034;
  position: fixed;
  top: 0px;
  transition-property: all;
  transition-duration: 0.5s;
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  transform: ${({ isOpen }) => `translateY(${isOpen ? "0%" : "100%"})`};
`;

export const SearchWrapper = styled.div`
  height: 60px;
  border-bottom: 1px solid #e5edef;
  padding: 0 20px;
  display: flex;
  align-items: center;

  input {
    padding: 10px 20px 10px 10px;
    font-size: 16px;
    height: 58px;
    flex: 1;
    color: #332927;
    border: none;
    font-size: 14px;

    &:focus {
      outline: none;
      box-shadow: none;
    }
  }
`;

export const BodyWrapper = styled.div`
  height: calc(100vh - 110px);
  overflow-y: auto;
`;

export const DisclaimerWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0px 25px;
  color: #9faab7;
  text-align: center;

  strong {
    color: #332927;
  }
`;
