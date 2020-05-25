import React from "react";
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

const Category = ({
  category,
  partners,
  currentUrl,
  subcategory,
  address,
  isLoadingPartners,
}) => {
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
