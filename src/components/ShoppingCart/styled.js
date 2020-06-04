import styled from "styled-components";
import { Button } from "reactstrap";

export const ButtonStyled = styled(Button)`
  background-color: white;
  color: #222;
  border: none;
  outline: none;
  position: relative;

  &:hover,
  &:active,
  &:focus {
    background-color: white !important;
    color: #222 !important;
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
  }

  span.fa {
    color: #f74342;
  }
`;

export const ShoppingCartBubble = styled.span`
  position: absolute;
  top: 0px;
  right: 2px;
  background: #f74342;
  border-radius: 50%;
  font-size: 10px;
  width: 18px;
  height: 18px;
  line-height: 14px;
  padding: 2px;
  color: white;
`;
