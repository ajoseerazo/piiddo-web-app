import React, { useEffect, useState } from "react";
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
  TopCategoriesWrapper,
} from "./styled";
import RestaurantSummary from "../../components/RestaurantSummary";
import Footer from "../../components/Footer";
import "../../styles.scss";
import "../../shop-styles.scss";
import HorizontalCategories from "../../components/HorizontalCategories";
import PartnersPlaceholder from "../../components/PartnersPlaceholder";
import Router from "next/router";
import Toolbar from "../../components/Toolbar";

const Category = ({
  category = {},
  partners,
  currentUrl,
  subcategory,
  address,
  isLoadingPartners,
  onChangeSubcategory,
  deliveryLocation
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
      <ShopHeader address={address} />

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
              categories={(category || {}).subcategories || []}
              categorySlug={category.slug}
              currentUrl={currentUrl}
              shallow={true}
            />
          </SidebarWrapper>

          <ContentWrapper>
            <h1>
              {!subcategory ? (
                `Restaurantes cerca de ti`
              ) : (
                <span>
                  Restaurantes <ChevronRightIcon>></ChevronRightIcon>{" "}
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
                  <Link
                    href="/restaurantes/v/[slug]"
                    as={`/restaurantes/v/${getSlug(partner.name)}`}
                    // shallow
                  >
                    <a>
                      <RestaurantSummary restaurant={partner} deliveryLocation={deliveryLocation} />
                    </a>
                  </Link>
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
