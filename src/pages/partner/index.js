import React, { useState, useCallback } from "react";
import getSlug from "speakingurl";
import Link from "next/link";
import ShopHeader from "../../components/ShopHeader/ShopHeader";
import Sidebar from "../../components/Sidebar";
import {
  HomeWrapper,
  ContentWrapper,
  SidebarWrapper,
  RestaurantsGrid,
  ChevronRightIcon,
} from "../category/styled";
import RestaurantSummary from "../../components/RestaurantSummary";
import Footer from "../../components/Footer";
import "../../styles.scss";
import "../../shop-styles.scss";
import {
  PartnerMediaWrapper,
  PartnerBanner,
  PartnerLogo,
  PartnerWrapper,
  PartnerInfoWrapper,
  PartnerInfo,
  PartnerName,
  PartnerHourly,
  PartnerDeliveryInfo,
  PartnerDeliveryText,
  PartnerContent,
  ProductsGrid,
  ProductsWrapper,
  CategoryName,
} from "./styled";
import ProductItem from "../../components/ProductItem";
import ProductModal from "../../components/ProductModal";

const Store = ({ currentUrl, partner }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productSelected, setProductSelect] = useState();

  const openProduct = useCallback(
    (product) => {
      setIsModalOpen(true);

      setProductSelect(product);
    },
    [setIsModalOpen]
  );

  const onCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  const onAddProductToCart = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  return (
    <>
      <ShopHeader />

      <HomeWrapper>
        <PartnerWrapper>
          <PartnerInfoWrapper>
            <PartnerMediaWrapper>
              <PartnerBanner src={partner.banner} />
              <PartnerLogo src={partner.logo} />
            </PartnerMediaWrapper>

            <PartnerInfo>
              <PartnerName>{partner.name}</PartnerName>
              <PartnerHourly>7:30am - 2:00pm</PartnerHourly>

              <PartnerDeliveryInfo>
                <div>
                  <PartnerDeliveryText>Delivery</PartnerDeliveryText>
                  <div>0.7$</div>
                </div>

                <div>
                  <PartnerDeliveryText>Entrega</PartnerDeliveryText>
                  <div>40 min</div>
                </div>
              </PartnerDeliveryInfo>
            </PartnerInfo>
          </PartnerInfoWrapper>

          <PartnerContent>
            <SidebarWrapper>
              <Sidebar
                categories={partner.catalog ? partner.catalog.categories : []}
                // categorySlug={category.slug}
                currentUrl={currentUrl}
                showTitle={false}
                scrollSpy
              />
            </SidebarWrapper>

            <ProductsWrapper>
              <CategoryName>{"Hamburguesas"}</CategoryName>

              <ProductsGrid>
                {partner.products && partner.products.length && (
                  <>
                    {partner.products.map((product) => (
                      <ProductItem
                        key={product.id}
                        product={product}
                        onSelectProduct={openProduct.bind(this, product)}
                      />
                    ))}
                  </>
                )}
              </ProductsGrid>
            </ProductsWrapper>
          </PartnerContent>
        </PartnerWrapper>

        <ProductModal
          isOpen={isModalOpen}
          onClose={onCloseModal}
          product={productSelected}
          onAccept={onAddProductToCart}
        />
      </HomeWrapper>

      <Footer />
    </>
  );
};

export default Store;
