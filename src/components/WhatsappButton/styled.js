import styled from "styled-components";

export const WhatsappButtonWrapper = styled.a`
  &:hover {
    text-decoration: none;
    color: white;
  }
`;

export const WhatsappButtonStyled = styled.button`
  box-shadow: rgba(0, 0, 0, 0.14) 0px 4px 9px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  font-size: 14px;
  border-radius: 6px;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  background: rgb(2, 231, 119);
  transition: all 100ms ease-in-out 0s;
  padding-left: 15px;
  padding-right: 15px;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.14) 0px 4px 9px;
  }

  span {
    font-size: 24px;
    margin-right: 5px;
  }

  p {
    margin: 0px;
    margin-left: 10px;
  }

  @media screen and (max-width: 768px) {
    font-size: 12px;
    padding-left: 15px;
    padding-right: 15px;
    height: 35px;

    span {
      font-size: 20px;
    }
  }
`;
