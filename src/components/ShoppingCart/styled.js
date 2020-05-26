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

  span {
    color: #f74342;
  }
`;
