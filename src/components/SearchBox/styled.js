import styled from "styled-components";
import { Button } from "reactstrap";

export const SearchBoxWrapper = styled.div`
  position: relative;
  max-width: 750px;
  width: 100%;
`;

export const SearchBoxInput = styled.input`
  padding: 24px 0 24px 24px;
  border-radius: 12px;
  font-size: 18px;
  border: none;
  height: 70px;
  width: 100%;

  &:focus {
    outline: none;
    box-shadown: none;
  }
`;

export const SearchIconWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 18px;
  font-size: 30px;
  height: 100%;
  width: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #ccc;
`;

export const SearchAddressButton = styled(Button)`
  width: auto;
  border-radius: 12px;
  margin-right: -14px;
  font-size: 20px;
  height: calc(100% - 6px);
  background: #f74342;
  border: none;

  &:hover,
  &:visited,
  &:active
  &:focus {
    background-color: #f74342 !important;
    border: none !important;
    box-shadow: none !important;
  }
`;
