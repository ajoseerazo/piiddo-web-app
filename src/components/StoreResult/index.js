import { useCallback, useState, useEffect } from "react";
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
import ProductModal from "../ProductModal";

const StoreResult = ({ store, onShowProduct, product, onAddProductToCart }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productSelected, setProductSelect] = useState();
  const [storeSelected, setStoreSelected] = useState();

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
    if (product) {
      setIsModalOpen(true);
      setProductSelect(product);
    }
  }, [product]);

  const onAddProduct = useCallback((product, store) => {
    onShowProduct(product);
    setIsModalOpen(true);
    setProductSelect(product);
    setStoreSelected({
      id: store.id,
      logo: store.logo,
      slug: store.slug,
      location: store.location,
    });
  });

  const onCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setProductSelect(null);
    setStoreSelected(null);
  });

  const addProductToCart = useCallback((order) => {
    onAddProductToCart(order, storeSelected);
    onCloseModal();
  }, [storeSelected]);

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
            return (
              <ProductItemResult
                product={product}
                key={product.id}
                onAddProduct={onAddProduct.bind(this, product, store)}
              />
            );
          })}
        </Slider>
      </ProductsWrapper>

      <ProductModal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        product={productSelected}
        onAccept={addProductToCart}
      />
    </StoreWrapper>
  );
};

export default StoreResult;
