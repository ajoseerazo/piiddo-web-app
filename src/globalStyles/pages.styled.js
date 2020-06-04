import styled from "styled-components";

export const PageMainContainerStyled = styled.div`
  background-color: #fff;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  margin-top: 70px;

  @media (max-width: 768px) {
    margin-top: 50px;
  }
`;

export const ProductsContainer = styled.div`
  text-align: left;
  border-radius: 4px;
  min-height: 50vh;
  padding: 0px 60px;
  background: #fafaf8;
  width: 100%;

  @media (max-width: 768px) {
    width: 100%;
    padding: 15px !important;
  }
`;

export const SectionNameStyled = styled.h1`
  font-size: 28px;
  color: #242424;
  padding: 0px 15px;
  font-weight: 600;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;
