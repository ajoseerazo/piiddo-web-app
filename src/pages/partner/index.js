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
} from "../category/styled";
import RestaurantSummary from "../../components/RestaurantSummary";
import Footer from "../../components/Footer";
import "../../styles.scss";
import "../../shop-styles.scss";

const Store = ({ category, partners, currentUrl, subcategory }) => {
  return (
    <>
      <ShopHeader />

      <HomeWrapper>
        <div>
          <SidebarWrapper>
            <Sidebar
              // categories={category.subcategories}
              // categorySlug={category.slug}
              currentUrl={currentUrl}
            />
          </SidebarWrapper>

          <ContentWrapper>
            

            <RestaurantsGrid>
              
            </RestaurantsGrid>
          </ContentWrapper>
        </div>
      </HomeWrapper>

      <Footer />
    </>
  );
};

export default Store;
