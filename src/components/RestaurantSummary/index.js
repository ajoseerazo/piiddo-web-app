import React from "react";
import {
  RestaurantName,
  RestaurantBanner,
  RestaurantWrapper,
  RestaurantInfoWrapper,
  RestaurantDeliveryPrice,
  RestaurantDeliveryETA,
  RestaurantTags,
  RestaurantFilters,
  BottomText
} from "./styled";

const RestaurantSummary = ({ restaurant }) => {
  return (
    <RestaurantWrapper>
      <RestaurantBanner src={restaurant.banner} />

      <RestaurantInfoWrapper>
        <RestaurantName>{restaurant.name}</RestaurantName>

        <RestaurantTags>
          {(restaurant.categories || []).join(" · ")}
        </RestaurantTags>

        <RestaurantFilters>
          <span>
            <RestaurantDeliveryPrice><BottomText>Delivery: </BottomText> 0.7$</RestaurantDeliveryPrice>
          </span>

          <span> · </span>

          <span>
            <RestaurantDeliveryETA><BottomText>Entrega en:</BottomText> 40 mins</RestaurantDeliveryETA>
          </span>
        </RestaurantFilters>
      </RestaurantInfoWrapper>
    </RestaurantWrapper>
  );
};

export default RestaurantSummary;
