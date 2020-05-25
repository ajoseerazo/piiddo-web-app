import React, { useState, useEffect } from "react";
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

const Category = ({
  category,
  currentUrl,
  partners,
  address,
  actions: { fetchPartners },
  isLoadingPartners,
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

  return (
    <CategoryPage
      category={category}
      partners={partners}
      address={address}
      isLoadingPartners={isLoadingPartners}
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
    params: { category: categoryQuery },
  } = ctx;

  const category = await store.dispatch(fetchCategory(categoryQuery));
  // const partners = await store.dispatch(fetchPartners(categoryQuery));

  const address = cookies(ctx).deliveryAddress || null;

  return {
    props: {
      category,
      currentUrl: `/category/${categoryQuery}`,
      address,
    },
  };
});

function mapStateToProps(state, props) {
  const { categories } = state.Categories;
  const { partners, isLoading } = state.Partners;

  return {
    categories,
    partners,
    isLoadingPartners: isLoading,
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

/*export const getStaticProps = wrapper.getStaticProps(async (ctx) => {
  console.log("Called");
  const { store } = ctx;

  const categories = await store.dispatch(fetchCategories());

  const address = cookies(ctx).deliveryAddress || null;
});*/

export default connect(mapStateToProps, mapDispatchToProps)(Category);
