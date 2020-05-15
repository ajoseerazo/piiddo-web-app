import React, { useState, useCallback } from "react";
import ShopHeader from "../../components/ShopHeader/ShopHeader";
import Sidebar from "../../components/Sidebar";
import Breadcumb from "../../components/Breadcumb";
import {
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
  CategoryWrapper,
  BreadcumbWrapper,
  HomeWrapper,
  MobileCategoriesWrapper,
  PartnerInfoWrapperMobile,
  PartnerInfoMobile,
  PartnerBannerMobile,
  PartnerTitleMobile,
  PartnerLogoMobile,
  PartnerMobileAddress,
  PartnerMobileDeliveryInfo
} from "./styled";
import ProductItem from "../../components/ProductItem";
import ProductModal from "../../components/ProductModal";
import shoppingCartActions from "../../redux/actions/shoppingCart";
import HorizontalCategories from "../../components/HorizontalCategories";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const { addToCart } = shoppingCartActions;

const Store = ({ currentUrl, partner, actions: { addToCart } }) => {
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

  const onAddProductToCart = useCallback(
    (order) => {
      setIsModalOpen(false);
      addToCart(order);
    },
    [setIsModalOpen]
  );

  return (
    <>
      <ShopHeader />

      <HomeWrapper>
        <PartnerWrapper>
          <BreadcumbWrapper>
            <Breadcumb
              items={[
                {
                  url: "/",
                  name: "Inicio",
                },
                {
                  url: `/category/restaurantes`,
                  name: "Restaurantes",
                },
                {
                  url: `/category/restaurantes/${partner.slug}`,
                  name: partner.name,
                },
              ]}
            />
          </BreadcumbWrapper>

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

          <PartnerInfoWrapperMobile>
            <PartnerBannerMobile src={partner.banner} />

            <PartnerInfoMobile>
              <PartnerLogoMobile src={partner.logo} />
              <PartnerTitleMobile>{partner.name}</PartnerTitleMobile>
              <PartnerMobileAddress>{partner.address}</PartnerMobileAddress>

              <PartnerMobileDeliveryInfo>
                <div>Delivery: 0.7$</div>

                <div>Entrega: 40 min</div>
              </PartnerMobileDeliveryInfo>
            </PartnerInfoMobile>
          </PartnerInfoWrapperMobile>

          <MobileCategoriesWrapper>
            <HorizontalCategories
              categories={partner.catalog ? partner.catalog.categories : []}
              currentUrl={currentUrl}
              scrollSpy={true}
            />
          </MobileCategoriesWrapper>

          <PartnerContent>
            <SidebarWrapper>
              <Sidebar
                categories={partner.catalog ? partner.catalog.categories : []}
                currentUrl={currentUrl}
                showTitle={false}
                scrollSpy
              />
            </SidebarWrapper>

            <ProductsWrapper>
              {partner.catalog ? (
                partner.catalog.categories.map((cat) => (
                  <>
                    {partner.productsHash[cat.id] &&
                      partner.productsHash[cat.id].length !== 0 && (
                        <CategoryWrapper id={cat.id}>
                          <CategoryName key={cat.id}>{cat.name}</CategoryName>

                          <ProductsGrid>
                            {partner.productsHash[cat.id].map((product) => (
                              <ProductItem
                                key={product.id}
                                product={product}
                                onSelectProduct={openProduct.bind(
                                  this,
                                  product
                                )}
                              />
                            ))}
                          </ProductsGrid>
                        </CategoryWrapper>
                      )}
                  </>
                ))
              ) : (
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
              )}
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

function mapStateToProps(state, props) {
  const { products } = props;

  return {
    products,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ addToCart }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Store);
