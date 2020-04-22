import React from "react";
import { CategoryWrapper, ImageWrapper } from "./styled";
import Link from "next/link";

const Category = ({ name, image, slug }) => {
  return (
    <CategoryWrapper>
      <Link href={`/category/${slug}`}>
        <>
          <ImageWrapper category={name}>
            <img src={image} alt={name} />
          </ImageWrapper>
          <p>{name}</p>
        </>
      </Link>
    </CategoryWrapper>
  );
};

export default Category;
