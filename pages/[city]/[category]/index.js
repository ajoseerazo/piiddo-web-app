import React, { useState, useEffect, useCallback } from "react";
import CategoryPage from "../../../src/pages/category";
import categoriesActions from "../../../src/redux/actions/categories";
import partnersActions from "../../../src/redux/actions/partners";
import cookies from "next-cookies";
import { wrapper } from "../../../src/redux/store";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import API from "../../../src/api";
import { CITIES } from "../../../src/utils/constants";
import { useSelector } from "react-redux";
import { usePartners } from "../../../src/hooks";

const { fetchCategory } = categoriesActions;
const { fetchPartners } = partnersActions;

const Category = ({
  category,
  currentUrl,
  // partners,
  address,
  actions: { fetchPartners },
  // isLoadingPartners,
  deliveryLocation,
  city,
}) => {
  console.log("Category", category);
  const [isBrowser, setIsBrowser] = useState(false);
  const { partners, isLoading: isLoadingPartners } = usePartners(category);

  useEffect(() => {
    if (!isBrowser && category) {
      if (typeof window !== "undefined") {
        setIsBrowser(true);

        // fetchPartners(city, category.slug);
      }
    }
  }, [isBrowser, category]);

  const changeSubcategory = useCallback(
    (subcategory) => {
      // fetchPartners(city, subcategory);
    },
    [fetchPartners]
  );

  return (
    <CategoryPage
      city={city}
      category={category}
      partners={partners}
      address={address}
      isLoadingPartners={isLoadingPartners}
      onChangeSubcategory={changeSubcategory}
      deliveryLocation={deliveryLocation}
      currentUrl={currentUrl}
    />
  );
};

export const getStaticPaths = async () => {
  const categories = await API.Categories.getAll();

  const paths = categories.map((cat) => {
    const partialPaths = CITIES.map((city) => {
      return {
        params: { city, category: cat.slug },
      };
    });

    return partialPaths;
  });

  return {
    paths: paths.flat(),
    fallback: false,
  };
};

export const getStaticProps = wrapper.getStaticProps(async (ctx) => {
  const {
    store,
    params: { category: categoryQuery, city },
  } = ctx;

  const category = await store.dispatch(fetchCategory(categoryQuery));
  // const partners = await store.dispatch(fetchPartners(categoryQuery));

  const address = cookies(ctx).deliveryAddress || null;

  return {
    props: {
      category,
      currentUrl: `/${city}/${categoryQuery}`,
      address,
      city,
    },
  };
});

function mapStateToProps(state, props) {
  const { categories } = state.Categories;
  const { partners, isLoading } = state.Partners;
  const { deliveryLocation } = state.Location;

  return {
    categories,
    // partners,
    // isLoadingPartners: isLoading,
    deliveryLocation,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        fetchPartners,
      },
      dispatch
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
