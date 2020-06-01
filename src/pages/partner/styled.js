import styled from "styled-components";

export const PartnerWrapper = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  display: flex !important;
  flex-direction: column !important;
  margin-top: 30px;

  @media screen and (max-width: 768px) {
    background: white;
  }
`;

export const PartnerInfoWrapper = styled.div`
  padding-bottom: 20px;
  border-bottom: 1px solid #e5edef;
  padding-left: 20px;
  margin: 30px 20px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: row;

  @media screen and (max-width: 768px) {
    margin: 0px;
    padding: 15px;
    background: white;
    border-bottom: none;
    display: none;
  }
`;

export const PartnerInfoWrapperMobile = styled.div`
  display: none;
  position: relative;
  margin-bottom: 110px;

  @media screen and (max-width: 768px) {
    height: 220px;
    display: block;
  }
`;

export const PartnerInfoMobile = styled.div`
  position: absolute;
  width: calc(100% - 30px);
  left: 15px;
  bottom: -90px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.1);
  height: 200px;
  background: rgba(255, 255, 255, 0.97);
  padding: 20px 0 30px;
`;

export const PartnerBannerMobile = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export const PartnerMediaWrapper = styled.div`
  position: relative;

  @media screen and (max-width: 768px) {
    width: 150px;
  }
`;

export const PartnerBanner = styled.img`
  width: 340px;
  height: 140px;
  object-fit: cover;
  object-position: center;
  border-radius: 8px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const PartnerLogo = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  left: 225px;
  top: 30px;
  position: absolute;

  @media screen and (max-width: 768px) {
    width: 80px;
    height: 80px;
    right: 10px;
    left: auto;
    bottom: 10px;
    top: auto;
  }
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

  @media screen and (max-width: 768px) {
    padding: 20px 15px;
    background: #fafaf8;
  }
`;

export const ProductsGrid = styled.div`
  grid-template-columns: repeat(2, 1fr);
  display: grid;
  max-width: 700px;
  grid-gap: 15px;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const ProductsWrapper = styled.div`
  flex: 1;
  padding: 0px 10px;
  margin-left: 20px;
  min-height: 200vh;

  @media screen and (max-width: 768px) {
    margin: 0px;
    padding: 0px;
    min-height: auto;
  }
`;

export const CategoryName = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

export const CategoryWrapper = styled.div`
  margin-bottom: 42px;

  @media screen and (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

export const BreadcumbWrapper = styled.div`
  margin-left: 40px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const HomeWrapper = styled.div`
  margin-top: 70px;
  padding-top: 20px;
  background: #fafaf8;
  position: relative;
  padding-bottom: 50px;

  > div {
    max-width: 1240px;
    display: flex;
    flex-direction: row;
    padding-left: 20px;
    padding-right: 20px;
    margin: 0 auto;
  }

  @media screen and (max-width: 768px) {
    margin-top: 50px;
    padding-top: 0px;
    min-height: calc(100vh - 50px);

    > div {
      padding: 0px;
    }
  }
`;

export const MobileCategoriesWrapper = styled.div`
  position: sticky;
  top: 48px;
  z-index: 1020;
  display: none;
  border-bottom: 1px solid #e5edef;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

export const PartnerTitleMobile = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-top: 2px;
`;

export const PartnerLogoMobile = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

export const PartnerMobileAddress = styled.div`
  font-size: 12px;
`;

export const PartnerMobileDeliveryInfo = styled.div`
  font-size: 12px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 80%;
  margin: 0 auto;
  margin-top: 5px;rgba(255,255,255,0.97)
`;

export const NoDataWrapper = styled.div`
  text-align: center;
  margin-top: 50px;
  font-size: 16px;
  font-weight: 600;
`;
