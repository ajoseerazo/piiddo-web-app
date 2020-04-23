import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import "./styles.scss";

const Sidebar = ({ categories, categorySlug }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);
  const [sidebarHeight, setSidebarHeightCallback] = useState(600);

  const setSidebarHeight = useCallback(() => {
    setSidebarHeightCallback(window.innerHeight - 110);
  }, [isBrowser]);

  useEffect(() => {
    if (!isMounted) {
    }
    if (!isBrowser) {
      if (typeof window !== "undefined") {
        setIsBrowser(true);

        setTimeout(() => {
          setSidebarHeight();
        }, 1000);
      }
    }
  });

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
            <li>
              <Link
                href="category/[category]"
                as={`/category/${categorySlug}`}
              >
                <a>Todos</a>
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category.slug}>
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
