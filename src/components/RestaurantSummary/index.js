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
  ClosedTag,
  BannerWrapper,
} from "./styled";
import { calculatePriceFromPoints } from "../../utils";
import moment from "moment";

const RestaurantSummary = ({ restaurant, deliveryLocation }) => {
  const [deliveryPrice, setDeliveryPrice] = useState(null);

  useEffect(() => {
    if (deliveryLocation && restaurant && restaurant.location) {
      setDeliveryPrice(
        calculatePriceFromPoints(deliveryLocation, restaurant.location)
      );
    }
  }, [deliveryLocation, restaurant]);

  const now = moment();

  const closed =
    !restaurant.isOpen ||
    (now.isBefore(moment(restaurant.openAt, "HH:mm")) &&
      now.isAfter(moment(restaurant.closeAt, "HH:mm")));

  return (
    <RestaurantWrapper>
      <BannerWrapper>
        <RestaurantBanner src={restaurant.banner} />
        {closed && <ClosedTag>Ya cerró</ClosedTag>}
      </BannerWrapper>

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
