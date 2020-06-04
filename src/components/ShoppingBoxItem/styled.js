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

export const ShoppingItem = styled.div`
  position: relative;
  display: flex;
  align-items: self-start;
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

export const ItemImage = styled.img`
  width: 46px;
  height: 46px;
  margin-right: 12px;
  border-radius: 50%;
  background-color: #f7f7f7;
  background-position: center;
  background-size: cover;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.03), 0 4px 4px 0 rgba(0, 0, 0, 0.03),
    0 8px 8px 0 rgba(0, 0, 0, 0.03), 0 16px 16px 0 rgba(0, 0, 0, 0.03),
    0 32px 32px 0 rgba(0, 0, 0, 0.03), 0 64px 64px 0 rgba(0, 0, 0, 0.03);
`;

export const ProductInfoWrapper = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  min-width: 200px;

  @media screen and (max-width: 768px) {
    min-width: 150px;
    max-width: 150px;
  }
`;

export const ShoppingItemTitle = styled.div`
  font-weight: 600;
  color: #434343;
  background: #ffffff;
`;

export const ShoppingItemDescription = styled.div`
  font-size: 13px;
  color: #7b7b7a;

  > div {
    width: 90%;
    line-height: 1.2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 100;
  }
`;

export const ShoppingItemAmount = styled.div`
  float: right;
  color: #7d7d7d;
  position: relative;
  flex: 1;
  text-align: right;
  font-size: 15px;
`;
