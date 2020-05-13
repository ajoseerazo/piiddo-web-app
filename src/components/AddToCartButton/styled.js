import styled from "styled-components";
import { Button } from "reactstrap";

export const ButtonStyled = styled(Button)`
  background-color: #f74342;
  color: white;
  border: none;
  border-radius: 8px;
  height: 40px;
  display: flex;
  flex-direction: row;
  width: 190px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;

  &:hover {
    background-color: #f74342;
  }

  &:active,
  &:focus {
    background-color: #f74342 !important;
    border: none;
    outline: none;
    box-shadow: none;
  }
`;
