import React from "react";
import CategoryPage from "../../../src/pages/category";
import categoriesActions from "../../../src/redux/actions/categories";
import partnersActions from "../../../src/redux/actions/partners";

const { fetchCategory } = categoriesActions;
const { fetchPartners } = partnersActions;

const SubCategory = ({ category, partners, currentUrl }) => {  
  return <CategoryPage category={category} partners={partners} currentUrl={currentUrl} />;
};

SubCategory.getInitialProps = async ({ store, query: { category: categoryQuery, subcategory } }) => {
  const category = await store.dispatch(fetchCategory(categoryQuery));
  const partners = await store.dispatch(fetchPartners(categoryQuery, subcategory));

  return { category, partners, currentUrl: `/category/${categoryQuery}/${subcategory}` };
};

export default SubCategory;
