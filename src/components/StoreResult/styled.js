import styled from "styled-components";

export const StoreWrapper = styled.div`
  a {
    color: black;
    text-decoration: none;

    &:hover,
    &:active,
    &:visited,
    &:focus {
      color: black;
      text-decoration: none;
    }
  }
`;

export const ProductsWrapper = styled.div`
  padding: 25px 0px 40px 0px;
  border-bottom: 1px solid #e8e8e8;

  .slick-slider {
    margin-left: 20px;
    margin-right: 20px;
  }

  .slick-track {
    min-width: 100% !important;
  }

  @media screen and (max-width: 768px) {
    .slick-list {
      padding-left: 20px;
      svg  {
        display: none !important;
      }
    }

    .slick-slider {
      margin-left: 0px;
      margin-right: 0px;
    }
  }
`;

export const StoreInfo = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e8e8e8;
  padding: 20px;
`;

export const StoreLogo = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  box-shadow: 0 8px 8px 0 rgba(51, 41, 39, 0.07);
`;

export const StoreName = styled.div`
  margin-left: 10px;
  font-size: 16px;
  font-weight: 600;
`;

export const ArrowWrapper = styled.div`
  display: block;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 6px 10px 0 rgba(128, 98, 96, 0.16);
  z-index: 1;
  display: flex !important;
  justify-content: center;
  align-items: center;

  &:hover {
    background: white;
  }

  svg {
    width: 15px !important;
    height: 15px !important;
  }

  &:before {
    display: none;
  }

  @media screen and (max-width: 768px) {
    display: none !important;
  }
`;
