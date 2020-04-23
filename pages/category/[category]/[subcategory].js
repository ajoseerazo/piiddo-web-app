import React from "react";
import CategoryPage from "../../../src/pages/category";
import categoriesActions from "../../../src/redux/actions/categories";
import partnersActions from "../../../src/redux/actions/partners";

const { fetchCategory } = categoriesActions;
const { fetchPartners } = partnersActions;

const SubCategory = ({ category, partners }) => {
  return <CategoryPage category={category} partners={partners} />;
};

SubCategory.getInitialProps = async ({ store }) => {
  const category = await store.dispatch(fetchCategory("restaurantes"));
  const partners = await store.dispatch(fetchPartners("restaurantes"));

  return { category, partners };
};

export default SubCategory;
