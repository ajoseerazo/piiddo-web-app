import React from "react";
import CategoryPage from "../../src/pages/category";
import categoriesActions from "../../src/redux/actions/categories";
import partnersActions from "../../src/redux/actions/partners";
import cookies from "next-cookies";
import { wrapper } from "../../src/redux/store";

const { fetchCategory } = categoriesActions;
const { fetchPartners } = partnersActions;

const Category = ({ category, partners, currentUrl, address }) => {
  return (
    <CategoryPage category={category} partners={partners} address={address} />
  );
};

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { category: "restaurantes" } }, // See the "paths" section below
    ],
    fallback: false,
  };
};

export const getStaticProps = wrapper.getStaticProps(async (ctx) => {
  const {
    store,
    params: { category: categoryQuery },
  } = ctx;

  const address = cookies(ctx).deliveryAddress || null;

  return {
    props: {
      category: {},
      partners: [],
      currentUrl: `/category/${categoryQuery}`,
      address,
    },
  };
});

export default Category;
