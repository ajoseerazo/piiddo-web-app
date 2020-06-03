import Slider from "react-slick";
import ProductItemResult from "../ProductItemResult";
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";
import {
  StoreWrapper,
  ProductsWrapper,
  StoreInfo,
  StoreLogo,
  StoreName,
} from "./styled";
import PrevArrow from "./PrevArrow";
import NextArrow from "./NextArrow";
import Link from "next/link";

const StoreResult = ({ store }) => {
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

  return (
    <StoreWrapper>
      <Link
        href="/[category]/v/[slug]"
        as={`/${store.mainCategory}/v/${store.slug}`}
      >
        <a>
          <StoreInfo>
            <StoreLogo src={store.logo} />
            <StoreName>{store.name}</StoreName>
          </StoreInfo>
        </a>
      </Link>
      <ProductsWrapper>
        <Slider {...settings}>
          {store.products.map((product, index) => {
            return <ProductItemResult product={product} key={product.id} />;
          })}
        </Slider>
      </ProductsWrapper>
    </StoreWrapper>
  );
};

export default StoreResult;
