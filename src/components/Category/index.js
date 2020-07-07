import React from "react";
import { CategoryWrapper, ImageWrapper } from "./styled";
import Link from "next/link";

const Category = ({ name, image, slug, city = "merida" }) => {
  return (
    <CategoryWrapper>
      <Link
        href={
          slug === "restaurantes"
            ? "/[city]/restaurantes"
            : "/[city]/[category]"
        }
        as={`${
          slug === "restaurantes" ? `/${city}/restaurantes` : `/${city}/${slug}`
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
