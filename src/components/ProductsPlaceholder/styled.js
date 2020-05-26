import styled from "styled-components";

export const ProductsPlaceholderWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-gap: 20px;

  @media screen and (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media screen and (min-width: 481px and max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  } 
`;
