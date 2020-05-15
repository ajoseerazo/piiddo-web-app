import styled from "styled-components";

export const CategoriesWrapper = styled.div`
  grid-template-columns: repeat(5, 1fr);
  display: grid;
  grid-gap: 20px;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 16px;
    margin-bottom: 15px;

    &.main-categories {
      a {
        > div {
          padding-top: 0px;
          height: 130px;
          overflow: hidden;
        }
  
        img {
          height: 130px;
          position: absolute;
          top: -30px;
          right: -60px;
        }
  
        p {
          position: absolute;
          bottom: 5px;
          font-size: 14px !important;
          font-weight: 600;
          left: 10px;
          color: white;
        }
      }
    }

    &:last-of-type {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;
