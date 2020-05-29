import React, { useEffect, useState } from "react";
import {
  RestaurantName,
  RestaurantBanner,
  RestaurantWrapper,
  RestaurantInfoWrapper,
  RestaurantDeliveryPrice,
  RestaurantDeliveryETA,
  RestaurantTags,
  RestaurantFilters,
  BottomText,
} from "./styled";
import { calculatePriceFromPoints } from "../../utils";

const RestaurantSummary = ({ restaurant, deliveryLocation }) => {
  const [deliveryPrice, setDeliveryPrice] = useState(null);

  useEffect(() => {
    if (deliveryLocation && restaurant && restaurant.location) {
      setDeliveryPrice(
        calculatePriceFromPoints(deliveryLocation, restaurant.location)
      );
    }
  }, [deliveryLocation, restaurant]);

  return (
    <RestaurantWrapper>
      <RestaurantBanner src={restaurant.banner} />

      <RestaurantInfoWrapper>
        <RestaurantName>{restaurant.name}</RestaurantName>

        <RestaurantTags>
          {(restaurant.categories || []).join(" · ")}
        </RestaurantTags>

        <RestaurantFilters>
          {!Number.isNaN(deliveryPrice) && (
            <>
              <span>
                <RestaurantDeliveryPrice>
                  <BottomText>Delivery: </BottomText> {deliveryPrice}$
                </RestaurantDeliveryPrice>
              </span>

              <span> · </span>
            </>
          )}

          <span>
            <RestaurantDeliveryETA>
              <BottomText>Entrega en:</BottomText> 40 mins
            </RestaurantDeliveryETA>
          </span>
        </RestaurantFilters>
      </RestaurantInfoWrapper>
    </RestaurantWrapper>
  );
};

export default RestaurantSummary;
