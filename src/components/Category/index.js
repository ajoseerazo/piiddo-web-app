import React from "react";
import { CategoryWrapper, ImageWrapper } from "./styled";
import Link from "next/link";

const Category = ({ name, image, slug }) => {
  return (
    <CategoryWrapper>
      <Link
        href={
          slug === "restaurantes" ? "/restaurantes" : "/category/[category]"
        }
        as={`${
          slug === "restaurantes" ? "/restaurantes" : `/category/${slug}`
        }`}
      >
        <a>
          <ImageWrapper category={name}>
            <img src={image} alt={name} />
          </ImageWrapper>
          <p>{name}</p>
        </a>
      </Link>
    </CategoryWrapper>
  );
};

export default Category;
