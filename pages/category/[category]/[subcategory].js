import React, { useCallback, useEffect, useState } from "react";
import CategoryPage from "../../../src/pages/category";
import StorePage from "../../../src/pages/partner";
import categoriesActions from "../../../src/redux/actions/categories";
import partnersActions from "../../../src/redux/actions/partners";
import productsActions from "../../../src/redux/actions/products";
import cookies from "next-cookies";
import { useRouter } from "next/router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { wrapper } from "../../../src/redux/store";
import API from "../../../src/api";

const { fetchCategory } = categoriesActions;
const {
  fetchPartners,
  fetchPartner,
  fetchCatalog,
  fetchCatalogCategories,
} = partnersActions;
const { fetchProducts } = productsActions;

const SubCategory = ({
  category,
  partners,
  currentUrl,
  subcategory,
  partner,
  address,
  isLoadingPartners,
  actions: { fetchPartners },
}) => {
  const router = useRouter();
  const [innerSubcategory, setInnerSubcategory] = useState();
  const [innerCurrentURL, setInnerCurrentURL] = useState();
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    if (!isBrowser && !partner && category) {
      if (typeof window !== "undefined") {
        fetchPartners(category.slug, router.query.subcategory);
        setInnerSubcategory(router.query.subcategory);
        setInnerCurrentURL(
          `/category/${category.slug}/${router.query.subcategory}`
        );
        setIsBrowser(true);
      }
    }
  }, [partner, isBrowser, router.query.subcategory]);


  if (partner || router.isFallback) {
    return <StorePage showFallback={router.isFallback} partner={partner} address={address} />;
  }

  return (
    <CategoryPage
      category={category}
      partners={partners}
      currentUrl={innerCurrentURL ? innerCurrentURL : currentUrl}
      subcategory={innerSubcategory ? innerSubcategory : subcategory}
      address={address}
      isLoadingPartners={isLoadingPartners}
    />
  );
};

export const getStaticPaths = async () => {
  const categories = await API.Categories.getAll();

  const paths = categories.map((cat) => {
    if (cat.subcategories) {
      const catParams = [];
      for (let i = 0; i < cat.subcategories.length; i++) {
        catParams.push({
          params: {
            category: cat.slug,
            subcategory: cat.subcategories[i].slug,
          },
        });
      }

      return catParams;
    }
  });

  return {
    paths: paths.filter((p) => !!p).flat(),
    fallback: true,
  };
};

export const getStaticProps = wrapper.getStaticProps(async (ctx) => {
  const {
    store,
    params: { category: categoryQuery, subcategory },
  } = ctx;

  const category = await store.dispatch(fetchCategory(categoryQuery));

  const address = cookies(ctx).deliveryAddress || null;

  if (category) {
    const subcat = category.subcategories.find((cat) => {
      if (cat.slug === subcategory) {
        return true;
      }
    });

    let partners = [];
    let partner = null;

    if (subcat) {
      partners = await store.dispatch(
        fetchPartners(categoryQuery, subcategory)
      );
    } else {
      partner = await store.dispatch(fetchPartner(subcategory));
    }

    return {
      props: {
        category,
        partners,
        currentUrl: `/category/${categoryQuery}/${subcategory}`,
        subcategory,
        partner,
        address,
      },
    };
  } else {
    return {
      props: {},
    };
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(SubCategory);
