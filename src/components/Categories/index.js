import React, { useState, useEffect } from "react";
import Category from "../Category";
import { CategoriesWrapper } from "./styled";

const Categories = ({ categories }) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [breakPoint, setBreakPoint] = useState(0);

  useEffect(() => {
    if (!isBrowser) {
      if (typeof window !== "undefined") {
        setIsBrowser(true);

        if (window.innerWidth <= 768) {
          setBreakPoint(2);
        }
      }
    }
  }, [isBrowser]);

  if (!categories || !categories.length) {
    return <div></div>;
  }

  const mainCategories = [];
  const lastCategories = [];

  for (let i = 0; i < breakPoint; i++) {
    mainCategories.push(categories[i]);
  }

  for (let i = breakPoint; i < categories.length; i++) {
    lastCategories.push(categories[i]);
  }

  return (
    <div className={!isBrowser ? "hidden" : undefined}>
      <CategoriesWrapper className="main-categories">
        {mainCategories.map((cat, index) => (
          <Category
            name={cat.name}
            image={cat.image}
            slug={cat.slug}
            id={cat.id}
            key={index}
          />
        ))}
      </CategoriesWrapper>

      <CategoriesWrapper>
        {lastCategories.map((cat, index) => (
          <Category
            name={cat.name}
            image={cat.image}
            slug={cat.slug}
            id={cat.id}
            key={index}
          />
        ))}
      </CategoriesWrapper>
    </div>
  );
};

Categories.defaultProps = {
  categories: [],
};

export default Categories;
