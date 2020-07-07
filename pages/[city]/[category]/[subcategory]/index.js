import React, { useCallback, useEffect, useState } from "react";
import CategoryPage from "../../../../src/pages/category";
import StorePage from "../../../../src/pages/partner";
import categoriesActions from "../../../../src/redux/actions/categories";
import partnersActions from "../../../../src/redux/actions/partners";
import productsActions from "../../../../src/redux/actions/products";
import cookies from "next-cookies";
import { useRouter } from "next/router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { wrapper } from "../../../../src/redux/store";
import API from "../../../../src/api";
import { CITIES } from "../../../../src/utils/constants";

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
  deliveryLocation,
  city,
}) => {
  const router = useRouter();
  const [innerSubcategory, setInnerSubcategory] = useState();
  const [innerCurrentURL, setInnerCurrentURL] = useState();
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    if (!isBrowser && category && !partner) {
      if (typeof window !== "undefined") {
        fetchPartners(city, category.slug, router.query.subcategory);
        setInnerSubcategory(router.query.subcategory);
        setInnerCurrentURL(`/${city}/${category.slug}/${router.query.subcategory}`);
      }
    }
  }, [isBrowser, router.query.subcategory]);

  return (
    <CategoryPage
      city={city}
      category={category}
      partners={partners}
      currentUrl={innerCurrentURL ? innerCurrentURL : currentUrl}
      subcategory={innerSubcategory ? innerSubcategory : subcategory}
      address={address}
      isLoadingPartners={isLoadingPartners}
      deliveryLocation={deliveryLocation}
    />
  );
};

export const getStaticPaths = async () => {
  const categories = await API.Categories.getAll();

  const paths = categories.map((cat) => {
    if (cat) {
      if (cat.subcategories) {
        const catParams = [];
        for (let i = 0; i < cat.subcategories.length; i++) {
          CITIES.forEach((city) => {
            catParams.push({
              params: {
                city,
                category: cat.slug,
                subcategory: cat.subcategories[i].slug,
              },
            });
          });
        }

        return catParams;
      }
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
    params: { category: categoryQuery, subcategory, city },
  } = ctx;

  const category = await store.dispatch(fetchCategory(categoryQuery));

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
        fetchPartners(city, categoryQuery, subcategory)
      );
    } else {
      partner = await store.dispatch(fetchPartner(subcategory));
    }

    return {
      props: {
        category,
        partners,
        currentUrl: `/${city}/${categoryQuery}/${subcategory}`,
        subcategory,
        partner,
        city,
      },
    };
  } else {
    return {
      props: {
        category: {},
      },
    };
  }
});

function mapStateToProps(state, props) {
  const { categories } = state.Categories;
  const { partners, isLoading } = state.Partners;
  const { deliveryLocation } = state.Location;

  return {
    categories,
    partners,
    isLoadingPartners: isLoading,
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

export default connect(mapStateToProps, mapDispatchToProps)(SubCategory);
