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
`;

export const ProductInfo = styled.div`
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
`;

export const ProductTitle = styled.div`
  font-size: 16px;
  font-weight: 200;
`;

export const ProductDescription = styled.div`
  font-size: 12px;
  color: #7d7d7d;
  font-weight: 200;
`;

export const ProductPrice = styled.div`
  font-size: 14px;
  font-weight: 200;
`;
