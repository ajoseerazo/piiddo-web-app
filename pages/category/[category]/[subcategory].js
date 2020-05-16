import React, { useCallback } from "react";
import CategoryPage from "../../../src/pages/category";
import StorePage from "../../../src/pages/partner";
import categoriesActions from "../../../src/redux/actions/categories";
import partnersActions from "../../../src/redux/actions/partners";
import productsActions from "../../../src/redux/actions/products";
import cookies from "next-cookies";

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
}) => {
  if (partner) {
    return <StorePage partner={partner} address={address} />;
  }

  return (
    <CategoryPage
      category={category}
      partners={partners}
      currentUrl={currentUrl}
      subcategory={subcategory}
      address={address}
    />
  );
};

SubCategory.getInitialProps = async (ctx) => {
  const {
    store,
    query: { category: categoryQuery, subcategory },
  } = ctx;

  const category = await store.dispatch(fetchCategory(categoryQuery));

  const address = cookies(ctx).deliveryAddress;

  if (category) {
    const subcat = category.subcategories.find((cat) => {
      if (cat.slug === subcategory) {
        return true;
      }
    });

    let partners = [];
    let partner;

    if (subcat) {
      partners = await store.dispatch(
        fetchPartners(categoryQuery, subcategory)
      );
    } else {
      partner = await store.dispatch(fetchPartner(subcategory));
      partner.catalog = await store.dispatch(fetchCatalog(partner.id));
      const [products, extras, companions] = await store.dispatch(
        fetchProducts(partner.id, "partner")
      );

      partner.products = products;
      partner.extras = extras;
      partner.companions = companions;
      const categories = await store.dispatch(
        fetchCatalogCategories(partner.catalog.id)
      );
      partner.catalog.categories = categories;

      const productsHash = {
        all: products,
      };

      for (let i = 0; i < products.length; i++) {
        console.log(products[i].categories);

        if (products[i].categories) {
          for (let j = 0; j < products[i].categories.length; j++) {
            if (!productsHash[products[i].categories[j]]) {
              productsHash[products[i].categories[j]] = [];
            }

            productsHash[products[i].categories[j]].push(products[i]);
          }
        }
      }

      partner.productsHash = productsHash;
    }

    return {
      category,
      partners,
      currentUrl: `/category/${categoryQuery}/${subcategory}`,
      subcategory,
      partner,
      address,
    };
  } else {
    return {};
  }
};

export default SubCategory;
