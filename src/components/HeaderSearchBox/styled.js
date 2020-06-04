import styled from "styled-components";
import { Input, InputGroupAddon } from "reactstrap";

export const InputStyled = styled(Input)`
  background-color: #fafaf8 !important;
  border: none !important;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;

  &:focus {
    box-shadow: none !important;
    outline: none;
  }
`;

export const SearchButtonWrapper = styled(InputGroupAddon)`
  background-color: #fafaf8 !important;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  > span {
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    background-color: #fafaf8 !important;
    border: none !important;
  }
`;
