import React, { useState, useCallback, useEffect } from "react";
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
  PartnerMobileDeliveryInfo,
} from "./styled";
import ProductItem from "../../components/ProductItem";
import ProductModal from "../../components/ProductModal";
import shoppingCartActions from "../../redux/actions/shoppingCart";
import HorizontalCategories from "../../components/HorizontalCategories";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import partnersActions from "../../redux/actions/partners";
import productsActions from "../../redux/actions/products";
import ProductsPlaceholder from "../../components/ProductsPlaceholder";
import PartnerBannerPlaceholder from "../../components/PartnerBannerPlaceholder";
import Toolbar from "../../components/Toolbar";
import { calculatePriceFromPoints } from "../../utils";

const {
  fetchPartners,
  fetchPartner,
  fetchCatalog,
  fetchCatalogCategories,
} = partnersActions;

const { fetchProducts } = productsActions;

const { addToCart } = shoppingCartActions;

const Store = ({
  currentUrl,
  partner,
  actions: { addToCart, fetchCatalog, fetchCatalogCategories, fetchProducts },
  address,
  catalog,
  catalogCategories,
  products,
  showFallback,
  isLoadingCatalogCategories,
  isLoadingProducts,
  isLoadingCatalog,
  deliveryLocation,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productSelected, setProductSelect] = useState();
  const [deliveryPrice, setDeliveryPrice] = useState(null);

  const openProduct = useCallback(
    (product) => {
      setIsModalOpen(true);

      setProductSelect(product);
    },
    [setIsModalOpen]
  );

  const onCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setProductSelect(null);
  }, [setIsModalOpen]);

  const onAddProductToCart = useCallback(
    (order) => {
      onCloseModal();
      console.log(partner);
      addToCart({
        ...order,
        deliveryPrice,
      });
    },
    [setIsModalOpen, deliveryPrice, partner]
  );

  useEffect(() => {
    if (!isMounted && partner) {
      setIsMounted(true);

      fetchCatalog(partner.id);
      fetchProducts(partner.id, "partner");
    }
  }, [isMounted, partner]);

  useEffect(() => {
    if (catalog) {
      fetchCatalogCategories(catalog.id);
    }
  }, [catalog]);

  useEffect(() => {
    if (deliveryLocation && partner && partner.location) {
      setDeliveryPrice(
        calculatePriceFromPoints(deliveryLocation, partner.location)
      );
    }
  }, [deliveryLocation, partner]);

  return (
    <>
      <ShopHeader address={address} />

      <HomeWrapper>
        {partner ? (
          <>
            <PartnerWrapper>
              {!showFallback && (
                <>
                  <BreadcumbWrapper>
                    <Breadcumb
                      items={[
                        {
                          url: "/",
                          name: "Inicio",
                        },
                        {
                          url: `/${partner.mainCategory}`,
                          name: partner.mainCategory,
                        },
                        {
                          url: `/${partner.mainCategory}/v/${partner.slug}`,
                          name: partner.name,
                        },
                      ]}
                    />
                  </BreadcumbWrapper>
                </>
              )}

              <PartnerInfoWrapper>
                <PartnerBannerPlaceholder ready={!showFallback}>
                  {partner && (
                    <>
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
                            <div>
                              {isMounted && !Number.isNaN(deliveryPrice)
                                ? `${deliveryPrice ? deliveryPrice : ""}$`
                                : null}
                            </div>
                          </div>

                          <div>
                            <PartnerDeliveryText>Entrega</PartnerDeliveryText>
                            <div>40 min</div>
                          </div>
                        </PartnerDeliveryInfo>
                      </PartnerInfo>
                    </>
                  )}
                </PartnerBannerPlaceholder>
              </PartnerInfoWrapper>

              <PartnerInfoWrapperMobile>
                <PartnerBannerPlaceholder ready={!showFallback}>
                  {!showFallback && partner && (
                    <>
                      <PartnerBannerMobile src={partner.banner} />

                      <PartnerInfoMobile>
                        <PartnerLogoMobile src={partner.logo} />
                        <PartnerTitleMobile>{partner.name}</PartnerTitleMobile>
                        <PartnerMobileAddress>
                          {partner.address}
                        </PartnerMobileAddress>

                        <PartnerMobileDeliveryInfo>
                          <div>
                            Delivery:{" "}
                            {isMounted && !Number.isNaN(deliveryPrice)
                              ? `${deliveryPrice}$`
                              : null}
                          </div>

                          <div>Entrega: 40 min</div>
                        </PartnerMobileDeliveryInfo>
                      </PartnerInfoMobile>
                    </>
                  )}
                </PartnerBannerPlaceholder>
              </PartnerInfoWrapperMobile>

              <MobileCategoriesWrapper>
                <HorizontalCategories
                  categories={catalogCategories ? catalogCategories : []}
                  currentUrl={currentUrl}
                  scrollSpy={true}
                  withPlaceholder={true}
                  isLoading={showFallback || isLoadingCatalogCategories}
                />
              </MobileCategoriesWrapper>

              <PartnerContent>
                <SidebarWrapper>
                  <Sidebar
                    categories={catalogCategories ? catalogCategories : []}
                    currentUrl={currentUrl}
                    showTitle={false}
                    scrollSpy
                    withPlaceholder={true}
                    isLoading={showFallback || isLoadingCatalogCategories}
                  />
                </SidebarWrapper>

                <ProductsWrapper>
                  <ProductsPlaceholder
                    ready={
                      !showFallback &&
                      !isLoadingProducts &&
                      !isLoadingCatalogCategories &&
                      !isLoadingCatalog
                    }
                    rows={12}
                  >
                    {catalogCategories ? (
                      catalogCategories.map((cat) => (
                        <>
                          {products[cat.id] && products[cat.id].length !== 0 && (
                            <CategoryWrapper id={cat.id}>
                              <CategoryName key={cat.id}>
                                {cat.name}
                              </CategoryName>

                              <ProductsGrid>
                                {products[cat.id].map((product) => (
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
                        {products && products.all && (
                          <>
                            {products.all.map((product) => (
                              <ProductItem
                                key={product.id}
                                product={product}
                                onSelectProduct={openProduct.bind(
                                  this,
                                  product
                                )}
                              />
                            ))}
                          </>
                        )}
                      </ProductsGrid>
                    )}
                  </ProductsPlaceholder>
                </ProductsWrapper>
              </PartnerContent>
            </PartnerWrapper>

            <ProductModal
              isOpen={isModalOpen}
              onClose={onCloseModal}
              product={productSelected}
              onAccept={onAddProductToCart}
            />
          </>
        ) : (
          <div>Tienda no encontrada :(</div>
        )}
      </HomeWrapper>

      <Toolbar />

      <Footer />
    </>
  );
};

function mapStateToProps(state, props) {
  const { products, isLoading } = state.Products;
  const {
    catalog,
    catalogCategories,
    isLoadingCatalogCategories,
    isLoadingCatalog,
  } = state.Partners;
  const { deliveryLocation } = state.Location;

  const productsHash = {
    all: products,
  };

  if (products) {
    for (let i = 0; i < products.length; i++) {
      if (products[i].categories) {
        for (let j = 0; j < products[i].categories.length; j++) {
          if (!productsHash[products[i].categories[j]]) {
            productsHash[products[i].categories[j]] = [];
          }

          productsHash[products[i].categories[j]].push(products[i]);
        }
      }
    }
  }

  return {
    products: productsHash,
    catalog,
    catalogCategories,
    isLoadingCatalogCategories,
    isLoadingProducts: isLoading,
    isLoadingCatalog,
    deliveryLocation,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      { addToCart, fetchCatalog, fetchCatalogCategories, fetchProducts },
      dispatch
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Store);
