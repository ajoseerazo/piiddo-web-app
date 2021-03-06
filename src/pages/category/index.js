import React, { useEffect, useState } from "react";
import getSlug from "speakingurl";
import DynamicLink from "../../components/DynamicLink";
import ShopHeader from "../../components/ShopHeader/ShopHeader";
import Sidebar from "../../components/Sidebar";
import {
  HomeWrapper,
  ContentWrapper,
  SidebarWrapper,
  RestaurantsGrid,
  ChevronRightIcon,
  TopCategoriesWrapper,
} from "./styled";
import RestaurantSummary from "../../components/RestaurantSummary";
import Footer from "../../components/Footer";
import HorizontalCategories from "../../components/HorizontalCategories";
import PartnersPlaceholder from "../../components/PartnersPlaceholder";
import Router from "next/router";
import Toolbar from "../../components/Toolbar";
import Head from "next/head";
import MetaTags from "../../components/MetaTags";

const Category = ({
  category = {},
  partners,
  currentUrl,
  subcategory,
  address,
  isLoadingPartners,
  onChangeSubcategory,
  deliveryLocation,
  city,
}) => {
  const [isBrowser, setIsBrowser] = useState(false);

  const handleRouteChange = (url) => {
    console.log("App is changing to: ", url);
    /*const [rootPath, category, subcategory] = url.split("/");

    if (subcategory && onChangeSubcategory) {
      onChangeSubcategory(subcategory);
    }*/
  };

  useEffect(() => {
    if (!isBrowser) {
      if (typeof window !== "undefined") {
        Router.events.on("routeChangeStart", handleRouteChange);
        setIsBrowser(true);
      }
    }
  }, [isBrowser]);

  return (
    <>
      <MetaTags
        title={`Piiddo | Haz tus compras de ${category.name} y te lo llevamos en minutos`}
        description={`Haz tu pedido de ${category.name} con Piiddo y recíbelo en minutos`}
        url={`https://piiddo.com/${category.slug}`}
      />

      <ShopHeader address={address} city={city} />

      <TopCategoriesWrapper>
        <HorizontalCategories
          categories={(category || {}).subcategories || []}
          categorySlug={category.slug}
          currentUrl={currentUrl}
          shallow={true}
        />
      </TopCategoriesWrapper>

      <HomeWrapper>
        <div>
          <SidebarWrapper>
            <Sidebar
              city={city}
              categories={(category || {}).subcategories || []}
              categorySlug={category.slug}
              currentUrl={currentUrl}
              shallow={true}
            />
          </SidebarWrapper>

          <ContentWrapper>
            <h1>
              {!subcategory ? (
                `${(category || {}).slug} cerca de ti`
              ) : (
                <span>
                  {(category || {}).slug} <ChevronRightIcon>></ChevronRightIcon>{" "}
                  {subcategory} cerca de ti
                </span>
              )}
            </h1>

            <PartnersPlaceholder
              ready={partners && !isLoadingPartners}
              rows={12}
            >
              <RestaurantsGrid>
                {(partners || []).map((partner) => (
                  <DynamicLink
                    href="/[category]/v/[slug]"
                    as={`/${partner.mainCategory}/v/${getSlug(partner.name)}`}
                    // shallow
                  >
                    <a>
                      <RestaurantSummary
                        restaurant={partner}
                        deliveryLocation={deliveryLocation}
                      />
                    </a>
                  </DynamicLink>
                ))}
              </RestaurantsGrid>
            </PartnersPlaceholder>
          </ContentWrapper>
        </div>
      </HomeWrapper>

      <Toolbar />

      <Footer />
    </>
  );
};

export default Category;
