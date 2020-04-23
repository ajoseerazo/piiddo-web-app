import React from "react";
import { CategoryWrapper, ImageWrapper } from "./styled";
import Link from "next/link";

const Category = ({ name, image, slug }) => {
  console.log(`/category/${slug}`);

  return (
    <CategoryWrapper>
      <Link href="/category/[category]" as={`/category/${slug}`}>
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
