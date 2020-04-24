import styled from "styled-components";

export const PartnerWrapper = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  display: flex !important;
  flex-direction: column !important;
`;

export const PartnerInfoWrapper = styled.div`
  padding-bottom: 20px;
  border-bottom: 1px solid #e5edef;
  padding-left: 20px;
  margin: 0 20px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: row;
`;

export const PartnerMediaWrapper = styled.div`
  position: relative;
`;

export const PartnerBanner = styled.img`
  width: 340px;
  height: 140px;
  object-fit: cover;
  object-position: center;
  border-radius: 8px;
`;

export const PartnerLogo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  left: 225px;
  top: 30px;
  position: absolute;
`;

export const PartnerInfo = styled.div`
  margin-left: 30px;
`;

export const PartnerName = styled.div`
  color: black;
  font-size: 26px;
  margin-bottom: 5px;
  font-weight: 600;
  line-height: 32px;
`;

export const PartnerHourly = styled.div`
  font-size: 14px;
  color: #7d7d7d;
`;

export const PartnerDeliveryInfo = styled.div`
  display: flex;
  margin-top: 15px;

  > div {
    margin-right: 30px;
  }
`;

export const PartnerDeliveryText = styled.div`
  font-size: 12px;
  color: #7d7d7d;
  font-weight: 100;
`;

export const PartnerContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  padding-left: 20px;
  padding-right: 20px;
`;

export const ProductsGrid = styled.div`
  grid-template-columns: repeat(2, 1fr);
  display: grid;
  max-width: 700px;
  grid-gap: 15px;
`;

export const ProductsWrapper = styled.div`
  flex: 1;
  padding: 0px 10px;
  margin-left: 20px;
`;

export const CategoryName = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
`;