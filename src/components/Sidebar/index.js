import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Link as AnimatedLink } from "react-scroll";
import SidebarPlaceholder from "../SidebarPlaceholder";

import "./styles.scss";

const Div = ({ children }) => {
  return <div>{children}</div>;
};

const A = (props) => {
  return <a {...props} />;
};

const Sidebar = ({
  categories,
  categorySlug,
  currentUrl,
  showTitle,
  scrollSpy,
  shallow,
  withPlaceholder,
  isLoading
}) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    if (!isBrowser) {
      if (typeof window !== "undefined") {
        setIsBrowser(true);
      }
    }
  });

  const WrapperLink = !scrollSpy ? Link : Div;
  const MenuLink = scrollSpy ? AnimatedLink : A;

  const menuLinkOptions = scrollSpy
    ? {
        spy: true,
        smooth: true,
        duration: 500,
        activeClass: "active",
        offset: -90,
      }
    : {};

  return (
    <div
      className={`sidebar-wrapper sidebar is-sticky ${
        scrollSpy ? "is-scrollSpy" : undefined
      }`}
    >
      {showTitle && <div className="category-name">Categorías</div>}

      <SidebarPlaceholder rows={10} ready={withPlaceholder ? categories && categories.length && !isLoading : true}>
        <ul
          className={showTitle ? "with-title" : "no-title"}
          /*style={{
          height: sidebarHeight,
        }}
        */
        >
          <li
            className={
              `/restaurantes` === currentUrl ? "active" : undefined
            }
          >
            <WrapperLink
              href="/restaurantes"
              as={`/restaurantes`}
              shallow={shallow}
            >
              <MenuLink to={scrollSpy ? "all" : undefined} {...menuLinkOptions}>
                Todos
              </MenuLink>
            </WrapperLink>
          </li>
          {categories.map((category) => (
            <li
              className={
                `/restaurantes/${category.slug}` === currentUrl
                  ? "active"
                  : undefined
              }
            >
              <WrapperLink
                key={category.id || category.slug}
                href="/restaurantes/[subcategory]"
                as={`/restaurantes/${category.slug}`}
                shallow={shallow}
              >
                <MenuLink
                  to={scrollSpy ? `${category.id}` : undefined}
                  {...menuLinkOptions}
                >
                  {category.name}
                </MenuLink>
              </WrapperLink>
            </li>
          ))}
        </ul>
      </SidebarPlaceholder>
    </div>
  );
};

Sidebar.defaultProps = {
  categories: [],
  showTitle: true,
};

export default Sidebar;
