import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 70px;
  padding: 50px;

  @media screen and (max-width: 768px) {
    margin-top: 50px;
    height: calc(100vh - 50px);
    padding: 0px;
  }
`;
