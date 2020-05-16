import styled from "styled-components";
import { Button } from "reactstrap";

export const LinkButtonStyled = styled(Button)`
  background: transparent;
  border: none;
  color: #222;
  font-size: 12px;
  padding: 0px;
  text-align: left;

  &:hover,
  &:active,
  &:focus {
    background-color: transparent !important;
    border: none !important;
    color: #222 !important;
    box-shadow: none !important;
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

export const ProductItemRight = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    height: 70px;
    justify-content: space-between;
    align-items: flex-end;
  }
`;

export const ProductItemLeft = styled.div`
  display: flex; 
  flex-direction: row;
`;
