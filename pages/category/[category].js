import React from "react";
import CategoryPage from "../../src/pages/category";
import categoriesActions from "../../src/redux/actions/categories";
import partnersActions from "../../src/redux/actions/partners";
import cookies from "next-cookies";

const { fetchCategory } = categoriesActions;
const { fetchPartners } = partnersActions;

const Category = ({ category, partners, currentUrl, address }) => {
  return (
    <CategoryPage category={category} partners={partners} address={address} />
  );
};

Category.getInitialProps = async (ctx) => {
  const {
    store,
    query: { category: categoryQuery },
  } = ctx;

  const category = await store.dispatch(fetchCategory(categoryQuery));
  const partners = await store.dispatch(fetchPartners(categoryQuery));

  const address = cookies(ctx).deliveryAddress;

  return {
    category,
    partners,
    currentUrl: `/category/${categoryQuery}`,
    address,
  };
};

export default Category;
