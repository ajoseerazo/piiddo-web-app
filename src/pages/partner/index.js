import React, { useState, useCallback, useEffect, useMemo } from "react";
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
  NoDataWrapper,
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
import {
  calculatePriceFromPoints,
  getPrice,
  normalizeProduct,
} from "../../utils";
import GA from "../../utils/ga";
import MetaTags from "../../components/MetaTags";
import Link from "next/link";
import getSlug from "speakingurl";
import { useRouter } from "next/router";
import moment from "moment";
import { getDistance } from "geolib";

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
  modalOpened = false,
  defaultProductSelected,
  city,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(modalOpened);
  const [productSelected, setProductSelect] = useState(defaultProductSelected);
  const [deliveryPrice, setDeliveryPrice] = useState(null);
  const [distance, setDistance] = useState();
  const router = useRouter();

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

    window.history.pushState(
      `/${city}/${partner.mainCategory}/v/${partner.slug}`,
      partner.slug,
      `/${city}/${partner.mainCategory}/v/${partner.slug}`
    );
  }, [partner, setIsModalOpen]);

  const onAddProductToCart = useCallback(
    (order) => {
      onCloseModal();
      addToCart({
        ...order,
        partner: {
          id: partner.id,
          slug: partner.slug,
          logo: partner.logo,
          location: partner.location,
          eta: partner.eta || 40,
          commision: partner.commision,
          commisionIncluded: partner.commisionIncluded,
          promoDeliveryPrice: partner.promoDeliveryPrice || null
        },
      });
    },
    [setIsModalOpen, partner]
  );

  useEffect(() => {
    if (!isMounted && partner) {
      setIsMounted(true);

      GA.registerPageView(partner.slug);

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
        partner.promoDeliveryPrice ?? calculatePriceFromPoints(deliveryLocation, partner.location)
      );
    }
  }, [deliveryLocation, partner]);

  const productsReady = useMemo(() => {
    return (
      !showFallback &&
      !isLoadingProducts &&
      !isLoadingCatalogCategories &&
      !isLoadingCatalog
    );
  }, [
    showFallback,
    isLoadingProducts,
    isLoadingCatalogCategories,
    isLoadingCatalog,
  ]);

  const noData = useMemo(() => {
    return productsReady && products.all && !products.all.length;
  }, [productsReady, products, products.all]);

  const onClickProduct = useCallback(
    (product) => {
      window.history.pushState(
        `/${city}/${partner.mainCategory}/v/${partner.slug}/productos/${product.id}`,
        product.id,
        `/${city}/${partner.mainCategory}/v/${partner.slug}/productos/${product.id}`
      );
    },
    [partner]
  );

  useEffect(() => {
    if (partner && partner.location && deliveryLocation) {
      setDistance(
        getDistance(
          { latitude: partner.location.lat, longitude: partner.location.lng },
          { latitude: deliveryLocation.lat, longitude: deliveryLocation.lng }
        )
      );
    }
  }, [partner, deliveryLocation]);

  return (
    <>
      <MetaTags
        title={
          defaultProductSelected
            ? `Piiddo | Pide ${defaultProductSelected.name} de ${partner.name}`
            : `Piiddo | Pide de ${partner.name} y te lo llevamos en minutos`
        }
        description={
          defaultProductSelected
            ? `Pide ${defaultProductSelected.name} de ${partner.name} y recíbelo en minutos en la puerta de tu casa`
            : `Haz tu pedido de ${partner.name} con Piiddo y recíbelo en minutos`
        }
        url={
          defaultProductSelected
            ? `https://piiddo.com/${city}/${partner.mainCategory}/v/${partner.slug}/productos/${defaultProductSelected.id}`
            : `https://piiddo.com/${city}/${partner.mainCategory}/v/${partner.slug}`
        }
      />

      <ShopHeader address={address} city={city} hideCitySelector />

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
                          as: "/[city]",
                          url: `/${city}`,
                          name: "Inicio",
                        },
                        {
                          as: `/[city]/[category]`,
                          url: `/${city}/${partner.mainCategory}`,
                          name: partner.mainCategory,
                        },
                        {
                          as: `/[city]/[category]/v/[slug]`,
                          url: `/${city}/${partner.mainCategory}/v/${partner.slug}`,
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
                        <PartnerHourly>
                          {partner.openAt
                            ? moment(partner.openAt, "HH:mm").format("hh:mm a")
                            : "07:00 am"}{" "}
                          -{" "}
                          {partner.closeAt
                            ? moment(partner.closeAt, "HH:mm").format("hh:mm a")
                            : "02:00 pm"}
                        </PartnerHourly>

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
                            <div>{partner.eta || 40} min</div>
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

                          <div>Entrega: {partner.eta || 40} min</div>
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
                  isReady={productsReady}
                  isLoading={
                    !noData || showFallback || isLoadingCatalogCategories
                  }
                />
              </MobileCategoriesWrapper>

              <PartnerContent>
                <SidebarWrapper>
                  <Sidebar
                    city={city}
                    categories={catalogCategories ? catalogCategories : []}
                    currentUrl={currentUrl}
                    showTitle={false}
                    scrollSpy
                    withPlaceholder={true}
                    isReady={productsReady}
                    isLoading={
                      !noData || showFallback || isLoadingCatalogCategories
                    }
                  />
                </SidebarWrapper>

                <ProductsWrapper>
                  <ProductsPlaceholder ready={productsReady} rows={12}>
                    {catalogCategories ? (
                      catalogCategories.map((cat) => (
                        <div key={cat.id}>
                          {products[cat.id] && products[cat.id].length !== 0 && (
                            <CategoryWrapper id={cat.id}>
                              <CategoryName key={cat.id}>
                                {cat.name}
                              </CategoryName>

                              <ProductsGrid>
                                {products[cat.id].map((product) => (
                                  <a
                                    href={`/${city}/${partner.mainCategory}/v/${partner.slug}/productos/${product.id}`}
                                    key={`${product.id}`}
                                    onClick={(e) => {
                                      e.preventDefault();

                                      if (deliveryLocation) {
                                        if (partner.maxDeliveryDistance) {
                                          if (
                                            distance <
                                            partner.maxDeliveryDistance
                                          ) {
                                            onClickProduct(product);
                                          }
                                        } else {
                                          onClickProduct(product);
                                        }
                                      }
                                    }}
                                  >
                                    <ProductItem
                                      key={product.id}
                                      product={product}
                                      commision={partner.commision}
                                      onSelectProduct={() => {
                                        if (deliveryLocation) {
                                          if (partner.maxDeliveryDistance) {
                                            if (
                                              distance <
                                              partner.maxDeliveryDistance
                                            ) {
                                              onClickProduct(product);
                                              openProduct(product);
                                            } else {
                                              alert(
                                                `Lo sentimos, no puedes pedir de esta tienda. ${
                                                  partner.name
                                                } solo permite deliveries hasta un máximo de ${parseFloat(
                                                  partner.maxDeliveryDistance /
                                                    1000
                                                ).toFixed(2)}km`
                                              );
                                            }
                                          } else {
                                            onClickProduct(product);
                                            openProduct(product);
                                          }
                                        } else {
                                          alert(
                                            "Antes de realizar un pedido, debes ingresar tu dirección en la barra superior"
                                          );
                                        }
                                      }}
                                    />
                                  </a>
                                ))}
                              </ProductsGrid>
                            </CategoryWrapper>
                          )}
                        </div>
                      ))
                    ) : (
                      <ProductsGrid>
                        {products && products.all && (
                          <>
                            {products.all.map((product) => (
                              <ProductItem
                                key={product.id}
                                product={product}
                                commision={partner.commision}
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

                  {noData && (
                    <NoDataWrapper>
                      Los productos de esta tienda estan en proceso de carga
                    </NoDataWrapper>
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
  const { partner } = props;
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
      const product = normalizeProduct(products[i], partner);

      if (product.categories) {
        for (let j = 0; j < product.categories.length; j++) {
          if (!productsHash[product.categories[j]]) {
            productsHash[product.categories[j]] = [];
          }

          productsHash[product.categories[j]].push(product);
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
