import React from "react";
import ShopHeader from "../../components/ShopHeader/ShopHeader";
import Sidebar from "../../components/Sidebar";
import { HomeWrapper, ContentWrapper, SidebarWrapper, RestaurantsGrid } from "./styled";
import RestaurantSummary from "../../components/RestaurantSummary";
import Footer from "../../components/Footer";
import "../../styles.scss";
import "../../shop-styles.scss";

const Category = ({ category, partners, currentUrl }) => {
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
            <h1>Más de {partners.length} Restaurantes en Mérida</h1>

            <RestaurantsGrid>
              {partners.map((partner) => {
                return <RestaurantSummary restaurant={partner} />;
              })}
            </RestaurantsGrid>
          </ContentWrapper>
        </div>
      </HomeWrapper>

      <Footer />
    </>
  );
};

export default Category;
