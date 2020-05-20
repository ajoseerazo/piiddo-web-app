import styled from "styled-components";

export const InputStyled = styled.input`
  height: 50px;
  background: #f7f7f7;
  border: none;
  border-radius: 8px;
  padding: 12px;

  &:focus {
    box-shadow: none;
    outline: none;
    background: #f7f7f7;
  }

  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;
