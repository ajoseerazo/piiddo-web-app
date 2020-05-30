import React, { useState, useEffect, useCallback } from "react";
import CategoryPage from "../../src/pages/category";
import categoriesActions from "../../src/redux/actions/categories";
import partnersActions from "../../src/redux/actions/partners";
import cookies from "next-cookies";
import { wrapper } from "../../src/redux/store";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import API from "../../src/api";

const { fetchCategory } = categoriesActions;
const { fetchPartners } = partnersActions;

const Restaurantes = ({
  category,
  currentUrl,
  partners,
  address,
  actions: { fetchPartners },
  isLoadingPartners,
  deliveryLocation
}) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    if (!isBrowser && category) {
      if (typeof window !== "undefined") {
        setIsBrowser(true);

        fetchPartners(category.slug);
      }
    }
  }, [isBrowser, category]);

  const changeSubcategory = useCallback(
    (subcategory) => {
      console.log("emtra");
      fetchPartners(subcategory);
    },
    [fetchPartners]
  );

  return (
    <CategoryPage
      category={category}
      partners={partners}
      address={address}
      isLoadingPartners={isLoadingPartners}
      onChangeSubcategory={changeSubcategory}
      deliveryLocation={deliveryLocation}
    />
  );
};

export const getStaticPaths = async () => {
  const categories = await API.Categories.getAll();

  const paths = categories.map((cat) => {
    return {
      params: { category: cat.slug },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps = wrapper.getStaticProps(async (ctx) => {
  const {
    store,
    // params: { category: "restaurantes" },
  } = ctx;

  const category = await store.dispatch(fetchCategory("restaurantes"));
  // const partners = await store.dispatch(fetchPartners("restaurantes"));

  const address = cookies(ctx).deliveryAddress || null;

  return {
    props: {
      category,
      currentUrl: `/${"restaurantes"}`,
      address,
    },
  };
});

function mapStateToProps(state, props) {
  const { categories } = state.Categories;
  const { partners, isLoading } = state.Partners;
  const { deliveryLocation } = state.Location;

  return {
    categories,
    partners,
    isLoadingPartners: isLoading,
    deliveryLocation
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

export default connect(mapStateToProps, mapDispatchToProps)(Restaurantes);
