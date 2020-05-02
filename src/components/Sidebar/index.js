import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import "./styles.scss";

const Div = ({ children }) => {
  return <div>{children}</div>;
};

const A = (props) => {
  return <a {...props} />
}

const Sidebar = ({
  categories,
  categorySlug,
  currentUrl,
  showTitle,
  scrollSpy,
}) => {
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

  const WrapperLink = !scrollSpy ? Link : Div;
  const ALink = !scrollSpy ? A : Div;

  return (
    <div
      className={`sidebar-wrapper is-sticky`}
      style={{
        height: sidebarHeight,
      }}
    >
      <div className="sidebar">
        <div>
          {showTitle && <div className="category-name">Categorías</div>}
          <ul>
            <li
              className={
                `/category/${categorySlug}` === currentUrl
                  ? "active"
                  : undefined
              }
            >
              <WrapperLink
                href="/category/[category]"
                as={`/category/${categorySlug}`}
              >
                <ALink>Todos</ALink>
              </WrapperLink>
            </li>
            {categories.map((category) => (
              <WrapperLink
                key={category.slug}
                href="/category/[category]/[subcategory]"
                as={`/category/${categorySlug}/${category.slug}`}
              >
                <ALink>
                  <li
                    className={
                      `/category/${categorySlug}/${category.slug}` ===
                      currentUrl
                        ? "active"
                        : undefined
                    }
                  >
                    {category.name}
                  </li>
                </ALink>
              </WrapperLink>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

Sidebar.defaultProps = {
  categories: [],
  showTitle: true,
};

export default Sidebar;
