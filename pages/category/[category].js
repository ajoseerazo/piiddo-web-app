import React from "react";
import CategoryPage from "../../src/pages/category";
import categoriesActions from "../../src/redux/actions/categories";
import partnersActions from "../../src/redux/actions/partners";

const { fetchCategory } = categoriesActions;
const { fetchPartners } = partnersActions;

const Category = ({ category, partners, currentUrl }) => {  
  return <CategoryPage category={category} partners={partners}  />;
};

Category.getInitialProps = async ({ store, query: { category: categoryQuery } }) => {
  const category = await store.dispatch(fetchCategory(categoryQuery));
  const partners = await store.dispatch(fetchPartners(categoryQuery));

  return { category, partners, currentUrl: `/category/${categoryQuery}` };
};

export default Category;
