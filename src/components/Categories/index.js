import React from "react";
import Category from "../Category";
import { CategoriesWrapper } from "./styled";

const Categories = ({ categories }) => {
  return (
    <CategoriesWrapper>
      {categories.map((cat) => (
        <Category name={cat.name} image={cat.image} slug={cat.slug} />
      ))}
    </CategoriesWrapper>
  );
};

Categories.defaultProps = {
  categories: []
}

export default Categories;
