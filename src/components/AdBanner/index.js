import React from "react";
import {
  AdBannerWrapper,
  IconImage,
  TextWrapper,
  DiscountText,
  LeftWrapper,
  TextWrapperInner,
} from "./styled";

const AdBanner = () => {
  return (
    <AdBannerWrapper>
      <LeftWrapper>
        <IconImage src="https://firebasestorage.googleapis.com/v0/b/genial-core-212201.appspot.com/o/categories%2Fdash-d.png?alt=media&token=b3c34673-a117-4b9c-b0b8-9a85e8cc45bb" />

        <TextWrapper>
          <TextWrapperInner>
            ¡Realiza tus compras pagando con <strong>Remepagos</strong> en las
            tiendas
          </TextWrapperInner>
          <div>
            y <strong>recibe 10% de descuento en tu compra!</strong>
          </div>
        </TextWrapper>
      </LeftWrapper>

      <DiscountText>10%</DiscountText>
    </AdBannerWrapper>
  );
};

export default AdBanner;
