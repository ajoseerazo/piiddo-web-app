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
        {/*<IconImage src="https://firebasestorage.googleapis.com/v0/b/genial-core-212201.appspot.com/o/categories%2Fdash-d.png?alt=media&token=b3c34673-a117-4b9c-b0b8-9a85e8cc45bb" />*/}

        <TextWrapper>
          <TextWrapperInner>
            ¡Realiza tus compras pagando con <strong>Reme</strong>
            <i>Pagos</i>
          </TextWrapperInner>
          <div>
            y recibe <strong>10% de descuento</strong> en tu compra!
          </div>
        </TextWrapper>
      </LeftWrapper>

      <DiscountText>10%</DiscountText>
    </AdBannerWrapper>
  );
};

export default AdBanner;
