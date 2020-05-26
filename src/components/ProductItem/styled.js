import styled from "styled-components";

export const ProductItemWrapper = styled.div`
  background-color: white;
  border-radius: 8px;
  height: 120px;
  display: flex;
  flex-direction: row;
  cursor: pointer;

  &:hover {
    box-shadow: 0 11px 7px -7px rgba(0, 0, 0, 0.2);
  }

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    height: auto;
    box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.1);
    padding: 20px;
    border-radius: 10px;

    &:hover {
      box-shadow: none;
    }
  }
`;

export const ProductInfo = styled.div`
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  @media screen and (max-width: 768px) {
    padding: 10px 0px 0px;
  }
`;

export const ProductMedia = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;

  img {
    border-radius: 8px;
    height: 100px;
    width: 100px;
    object-fit: cover;
    object-position: center;
  }

  @media screen and (max-width: 768px) {
    margin-left: 0px;

    img {
      width: 100%;
      height: 160px;
      object-fit: cover;
      object-position: center;
    }
  }
`;

export const ProductTitle = styled.div`
  font-size: 16px;
  font-weight: 200;

  @media screen and (max-width: 768px) {
    margin-bottom: 10px;
    font-weight: 600;
  }
`;

export const ProductDescription = styled.div`
  font-size: 12px;
  color: #7d7d7d;
  font-weight: 200;
  height: 37px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  width: 100%;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const ProductPrice = styled.div`
  font-size: 14px;
  font-weight: 200;

  @media screen and (max-width: 768px) {
    font-size: 18px;
    color: #4a4a4a;
    opacity: 0.8;
    font-weight: 600;
  }
`;

export const ProductAddButton = styled.div`
  display: none;
  position: absolute;
  right: 0;
  bottom: 0px;
  background: rgba(247, 67, 66, 0.3);
  color: rgb(247, 67, 66);
  width: 30px;
  height: 30px;
  border-radius: 50%;

  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
