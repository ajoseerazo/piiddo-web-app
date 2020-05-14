import styled from "styled-components";
import { Button } from "reactstrap";

export const LinkButtonStyled = styled(Button)`
  background: transparent;
  border: none;
  color: #222;
  font-size: 12px;
  padding: 0px;

  &:hover,
  &:active,
  &:focus {
    background: transparent;
    border: none;
    color: #222;
    box-shadow: none;
  }

  span {
    margin-right: 5px;
  }
`;

export const Additionals = styled.ul`
  margin: 5px 0px;
  
  li {
    font-size: 12px;
  }
`;