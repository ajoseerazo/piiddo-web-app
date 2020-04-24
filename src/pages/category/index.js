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
} from "./styled";
import RestaurantSummary from "../../components/RestaurantSummary";
import Footer from "../../components/Footer";
import "../../styles.scss";
import "../../shop-styles.scss";

const Category = ({ category, partners, currentUrl, subcategory }) => {
  return (
    <>
      <ShopHeader />

      <HomeWrapper>
        <div>
          <SidebarWrapper>
            <Sidebar
              categories={category.subcategories}
              categorySlug={category.slug}
              currentUrl={currentUrl}
            />
          </SidebarWrapper>

          <ContentWrapper>
            <h1>
              {!subcategory ? (
                `Más de ${partners.length} Restaurantes en Mérida`
              ) : (
                <span>
                  Restaurantes <ChevronRightIcon>></ChevronRightIcon>{" "}
                  {subcategory} en Mérida
                </span>
              )}
            </h1>

            <RestaurantsGrid>
              {partners.map((partner) => (
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
          </ContentWrapper>
        </div>
      </HomeWrapper>

      <Footer />
    </>
  );
};

export default Category;
