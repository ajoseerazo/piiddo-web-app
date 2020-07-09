import React, { useEffect, useState, useCallback } from "react";
import DynamicLink from "../DynamicLink";
import { Link as AnimatedLink } from "react-scroll";
import SidebarPlaceholder from "../SidebarPlaceholder";
import { SidebarWrapper } from "./styled";
import useCity from "../../hooks/useCity";

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
  isLoading,
  isReady,
}) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const city = useCity();

  useEffect(() => {
    if (!isBrowser) {
      if (typeof window !== "undefined") {
        setIsBrowser(true);
      }
    }
  });

  const WrapperLink = !scrollSpy ? DynamicLink : Div;
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
    <SidebarWrapper
      className={`sidebar-wrapper sidebar is-sticky ${
        scrollSpy ? "is-scrollSpy" : undefined
      }`}
    >
      {showTitle && <div className="category-name">Categorías</div>}

      <SidebarPlaceholder
        rows={10}
        ready={withPlaceholder ? (isReady ? isReady : !isLoading) : true}
      >
        <ul
          className={showTitle ? "with-title" : "no-title"}
          /*style={{
          height: sidebarHeight,
        }}
        */
        >
          <li
            className={
              `/${city}/${categorySlug}` === currentUrl ? "active" : undefined
            }
          >
            <WrapperLink
              href="/[category]"
              as={`/${categorySlug}`}
              shallow={shallow}
            >
              <MenuLink to={scrollSpy ? "all" : undefined} {...menuLinkOptions}>
                Todos
              </MenuLink>
            </WrapperLink>
          </li>
          {categories.map((category, index) => (
            <li
              key={index}
              className={
                `/${city}/${categorySlug}/${category.slug}` === currentUrl
                  ? "active"
                  : undefined
              }
            >
              <WrapperLink
                key={category.id || category.slug}
                href="/[category]/[subcategory]"
                as={`/${categorySlug}/${category.slug}`}
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
    </SidebarWrapper>
  );
};

Sidebar.defaultProps = {
  categories: [],
  showTitle: true,
};

export default Sidebar;
