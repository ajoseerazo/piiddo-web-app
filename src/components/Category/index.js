import React from "react";
import { CategoryWrapper, ImageWrapper } from "./styled";
import Link from "next/link";

const Category = ({ name, image }) => {
  return (
    <CategoryWrapper>
      <Link href={`/category/${name}`}>
        <>
          <ImageWrapper>
            <img src={image} alt={name} />
          </ImageWrapper>
          <p>{name}</p>
        </>
      </Link>
    </CategoryWrapper>
  );
};

export default Category;
