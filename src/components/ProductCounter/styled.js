import styled from "styled-components";
import {
  Button
} from 'reactstrap'

export const ProductCounterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 150px;
  border: 1px solid #e5edef;
  padding: 2px;
  border-radius: 8px;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  color: #332927;
  height: 40px;
`;

export const ButtonStyled = styled(Button)`
  background-color: white;
  color: #F74342;
  border: none;
  border-radius: 8px;
  height: 100%;

  &:hover {
    background-color: #F74342;
  }

  &:active, &:focus {
    background-color: #F74342 !important;
    border: none;
    outline: none;
    box-shadow: none;
  }
`;
