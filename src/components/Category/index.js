import React from "react";
import { CategoryWrapper, ImageWrapper } from "./styled";
import Link from "next/link";
import DynamicLink from "../DynamicLink";

const Category = ({ name, image, slug }) => {
  return (
    <CategoryWrapper>
      <DynamicLink
        href={slug === "restaurantes" ? "/restaurantes" : slug !== "compralo-en-colombia" ? "/[category]" : "/[category]/v/[slug]"}
        as={`${
          slug === "restaurantes"
            ? `/restaurantes`
            : `/${
                slug !== "compralo-en-colombia"
                  ? slug
                  : `${slug}/v/compralo-en-colombia`
              }`
        }`}
      >
        <a>
          <ImageWrapper category={name}>
            <img src={image} alt={name} />
          </ImageWrapper>
          <p>{name}</p>
        </a>
      </DynamicLink>
    </CategoryWrapper>
  );
};

export default Category;
