import { useEffect, useState } from "react";
import Slider from "react-slick";
import ProductItemResult from "../ProductItemResult";
import {
  StoreWrapper,
  ProductsWrapper,
  StoreInfo,
  StoreLogo,
  StoreName,
} from "./styled";
import PrevArrow from "./PrevArrow";
import NextArrow from "./NextArrow";
import DynamicLink from "../DynamicLink";
import { normalizeProduct } from "../../utils";

const StoreResult = ({ store, onShowProduct }) => {
  const [products, setProducts] = useState();

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    if (store) {
      setProducts(
        store.products.map((product) => {
          return {
            ...normalizeProduct(product, store),
          };
        })
      );
    }
  }, [store]);

  return (
    <StoreWrapper>
      <DynamicLink
        href="/[category]/v/[slug]"
        as={`/${store.mainCategory}/v/${store.slug}`}
      >
        <a>
          <StoreInfo>
            <StoreLogo src={store.logo} />
            <StoreName>{store.name}</StoreName>
          </StoreInfo>
        </a>
      </DynamicLink>
      {products && products.length !== 0 && (
        <ProductsWrapper>
          <Slider {...settings}>
            {products.map((product, index) => {
              return (
                <ProductItemResult
                  product={product}
                  key={product.id}
                  onAddProduct={onShowProduct.bind(this, product, store)}
                />
              );
            })}
          </Slider>
        </ProductsWrapper>
      )}
    </StoreWrapper>
  );
};

export default StoreResult;
