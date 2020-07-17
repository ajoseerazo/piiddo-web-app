import styled from "styled-components";

export const RestaurantWrapper = styled.div`
  display: flex;
  display-flex: row;
  margin: 0px 25px 20px 0px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid #fff;

  &:hover {
    border: 1px solid #ddd;
  }

  @media screen and (max-width: 768px) {
    margin: 0px 0px 20px 0px;

    &:hover {
      border: 1px solid #fff;
    }
  }
`;

export const RestaurantInfoWrapper = styled.div`
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;

  @media screen and (max-width: 768px) {
    width: calc(100% - 150px);
  }
`;

export const RestaurantFilters = styled.div`
  font-size: 12px;
  color: #9faab7;
  font-weight: 200;
`;

export const RestaurantDeliveryETA = styled.span`
  color: #332927;
`;

export const RestaurantDeliveryPrice = styled.span`
  color: #332927;
`;

export const RestaurantTags = styled.div`
  color: #9faab7;
  font-size: 12px;
  font-weight: 100;
  height: 20px;
  overflow: hidden;
`;

export const RestaurantName = styled.div`
  font-family: "Poppins";
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 220px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const RestaurantBanner = styled.img`
  width: 130px;
  height: 80px;
  object-fit: cover;
  object-position: center;
  border-radius: 4px;
`;

export const BottomText = styled.span`
  font-size: 11px;
  color: #9faab7;
`;

export const ClosedTag = styled.div`
  position: absolute;
  top: 10px;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  background-color: #f74342;
  padding: 0px 5px;
  color: white;
  font-size: 12px;
  font-weight: 400;
`;

export const BannerWrapper = styled.div`
  position: relative;
`;