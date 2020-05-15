import styled from "styled-components";
import { Button } from "reactstrap";

export const ProductCounterWrapper = styled.div`
  display: flex;
  box-shadow: 0 0 10px 0 rgba(51, 41, 39, 0.15);
  border-radius: 4px;
  justify-content: space-between;
  align-items: center;
  width: 120px;
  font-size: 12px;
  height: 36px;
  padding: 3px;

  @media screen and (max-width: 768px) {
    margin-bottom: 8px;
  }
`;

export const ButtonStyled = styled(Button)`
  background-color: white;
  color: #f74342;
  border: none;
  border-radius: 8px;
  height: 100%;
  width: 30px;
  font-size: 12px;
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;

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

export const AmountWrapper = styled.div``;
