import styled from "styled-components";

export const AdBannerWrapper = styled.div`
  min-height: 200px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  border-radius: 22px;
  background-color: #1c8de4;
  box-shadow: 0 32px 32px 0 rgba(51, 41, 39, 0.05);
  margin-top: 20px;
  margin-bottom: 20px;
  color: #fff;
  padding-left: 30px;
  padding-right: 30px;

  @media screen and (max-width: 768px) {
    min-height: 120px;
    padding-left: 15px;
    padding-right: 15px;
    margin-top: 0px;
    margin-bottom: 15px;
  }
`;

export const IconImage = styled.img`
  height: 120px;
  width: 120px;
  object-fit: cover;
  object-position: center;

  @media screen and (max-width: 768px) {
    height: 70px;
    width: 70px;
  }
`;

export const TextWrapper = styled.div`
  font-size: 25px;
  margin-left: 20px;

  @media screen and (max-width: 768px) {
    margin-left: 0px;
    font-size: 12px;
    text-align: center;
  }
`;

export const DiscountText = styled.div`
  font-size: 70px;
  font-weight: bold;

  @media screen and (max-width: 768px) {
    font-size: 25px;
  }
`;

export const LeftWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const TextWrapperInner = styled.div`
  margin-bottom: 20px;

  @media screen and (max-width: 768px) {
    margin-bottom: 5px;
  }
`;
