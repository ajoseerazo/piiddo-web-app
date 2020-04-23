import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import "./styles.scss";

const Sidebar = ({ categories, categorySlug, currentUrl }) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [sidebarHeight, setSidebarHeightCallback] = useState(600);

  const setSidebarHeight = useCallback(() => {
    setSidebarHeightCallback(window.innerHeight - 110);
  }, [isBrowser]);

  useEffect(() => {
    if (!isBrowser) {
      if (typeof window !== "undefined") {
        setIsBrowser(true);

        setTimeout(() => {
          setSidebarHeight();
        }, 1000);
      }
    }
  });

  console.log(
    `/category/${categorySlug}` === currentUrl ? "active" : undefined
  );

  return (
    <div
      className={`sidebar-wrapper is-sticky`}
      style={{
        height: sidebarHeight,
      }}
    >
      <div className="sidebar">
        <div>
          <div className="category-name">Categorías</div>
          <ul>
            <li
              className={
                `/category/${categorySlug}` === currentUrl
                  ? "active"
                  : undefined
              }
            >
              <Link
                href="/category/[category]"
                as={`/category/${categorySlug}`}
              >
                <a>Todos</a>
              </Link>
            </li>
            {categories.map((category) => (
              <li
                key={category.slug}
                className={
                  `/category/${categorySlug}/${category.slug}` === currentUrl
                    ? "active"
                    : undefined
                }
              >
                <Link
                  href="/category/[category]/[subcategory]"
                  as={`/category/${categorySlug}/${category.slug}`}
                >
                  <a>{category.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
