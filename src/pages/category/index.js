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

const Category = ({
  category,
  partners,
  currentUrl,
  subcategory,
  address,
  isLoadingPartners,
  onChangeSubcategory,
}) => {
  console.log("entra");

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
          categories={category.subcategories || []}
          categorySlug={category.slug}
          currentUrl={currentUrl}
        />
      </TopCategoriesWrapper>

      <HomeWrapper>
        <div>
          <SidebarWrapper>
            <Sidebar
              categories={category.subcategories || []}
              categorySlug={category.slug}
              currentUrl={currentUrl}
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
                    href="/category/[category]/[subcategory]"
                    as={`/category/${category.slug}/${getSlug(partner.name)}`}
                  >
                    <a>
                      <RestaurantSummary restaurant={partner} />
                    </a>
                  </Link>
                ))}
              </RestaurantsGrid>
            </PartnersPlaceholder>
          </ContentWrapper>
        </div>
      </HomeWrapper>

      <Footer />
    </>
  );
};

export default Category;
