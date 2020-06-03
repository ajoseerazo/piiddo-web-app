import styled from "styled-components";
import { Button } from "reactstrap";

export const ProductWrapper = styled.div`
  width: 160px;
  margin-right: 40px;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    width: 190px;
    margin-right: 15px;
  }
`;

export const ProductImage = styled.img`
  width: 160px;
  height: 140px;
  background-color: white;
  border-radius: 12px;
  object-fit: cover;
  object-position: center;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const ProductInfoWrapper = styled.div`
  margin-top: 25px;
`;

export const ProductPrice = styled.div`
  color: #333;
  font-size: 16px;
  font-weight: 600;
`;

export const ProductName = styled.div`
  color: #706967;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ProductAddButton = styled(Button)`
  background-color: #f74342;
  color: white;
  border: none;
  border-radius: 8px;
  height: 34px;
  display: flex;
  flex-direction: row;
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 14px;
  align-items: center;
  font-size: 14px;
  margin-top: 10px;

  &:hover {
    background-color: #f74342;
    box-shadow: 0 10px 10px -5px #f74342;
  }

  &:active,
  &:focus {
    background-color: #f74342 !important;
    border: none;
    outline: none;
    box-shadow: none;
  }
`;
