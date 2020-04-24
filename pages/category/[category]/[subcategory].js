import React from "react";
import CategoryPage from "../../../src/pages/category";
import StorePage from "../../../src/pages/partner";
import categoriesActions from "../../../src/redux/actions/categories";
import partnersActions from "../../../src/redux/actions/partners";

const { fetchCategory } = categoriesActions;
const { fetchPartners, fetchPartner } = partnersActions;

const SubCategory = ({
  category,
  partners,
  currentUrl,
  subcategory,
  partner,
}) => {
  console.log("partner", partner);

  if (partner) {
    return <StorePage partner={partner} />;
  }

  return (
    <CategoryPage
      category={category}
      partners={partners}
      currentUrl={currentUrl}
      subcategory={subcategory}
    />
  );
};

SubCategory.getInitialProps = async ({
  store,
  query: { category: categoryQuery, subcategory },
}) => {
  const category = await store.dispatch(fetchCategory(categoryQuery));

  const subcat = category.subcategories.find((cat) => {
    if (cat === subcategory) {
      return true;
    }
  });

  let partners = [];
  let partner;

  if (subcat) {
    partners = await store.dispatch(fetchPartners(categoryQuery, subcategory));
  } else {
    partner = await store.dispatch(fetchPartner(subcategory));
  }

  return {
    category,
    partners,
    currentUrl: `/category/${categoryQuery}/${subcategory}`,
    subcategory,
    partner,
  };
};

export default SubCategory;
