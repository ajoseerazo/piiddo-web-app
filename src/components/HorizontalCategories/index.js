import { useState, useCallback, useEffect } from "react";
import DynamicLink from "../DynamicLink";
import { Link as AnimatedLink, Events } from "react-scroll";
import { Wrapper } from "./styled";
import Placeholder from "./placeholder";
import { useRouter } from "next/router";
import useCity from "../../hooks/useCity";

const Div = (props) => {
  return <div {...props} />;
};

const A = (props) => {
  return <a {...props} />;
};

const HorizontalCategories = ({
  categories,
  categorySlug,
  scrollSpy,
  shallow,
  withPlaceholder,
  isLoading,
  isReady,
}) => {
  const [selected, setSelected] = useState("all");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const currentUrl = router.asPath;
  const city = useCity();

  console.log(router.asPath);

  const WrapperLink = !scrollSpy ? DynamicLink : Div;
  const MenuLink = scrollSpy ? AnimatedLink : A;

  useEffect(() => {
    if (!mounted) {
      setMounted(true);

      Events.scrollEvent.register("end", function (to, element) {
        setSelected(to);
      });
    }
  }, [mounted]);

  const menuLinkOptions = scrollSpy
    ? {
        spy: true,
        smooth: true,
        duration: 500,
        activeClass: "selected",
        offset: -110,
      }
    : {};

  const setSelectedMenu = useCallback(
    (opt) => {
      console.log(opt);
      setSelected(opt);
    },
    [setSelected]
  );

  return (
    <Placeholder
      rows={10}
      ready={withPlaceholder ? (isReady ? isReady : !isLoading) : true}
    >
      <Wrapper>
        <li
          className={
            !scrollSpy
              ? currentUrl === `/${city}/${categorySlug}`
                ? "selected"
                : undefined
              : selected === "all"
              ? "selected"
              : undefined
          }
        >
          <WrapperLink
            href="/[category]"
            as={`/${categorySlug}`}
            onClick={scrollSpy ? setSelectedMenu.bind(this, "all") : undefined}
            shallow={shallow}
          >
            <MenuLink to={scrollSpy ? "all" : undefined} {...menuLinkOptions}>
              Todos
            </MenuLink>
          </WrapperLink>
        </li>

        {(categories || []).map((category) => (
          <li
            className={
              !scrollSpy
                ? `/${city}/${categorySlug}/${category.slug}` === currentUrl
                  ? "selected"
                  : undefined
                : selected === category.id
                ? "selected"
                : undefined
            }
            key={category.id || category.slug}
          >
            <WrapperLink
              href="/[category]/[subcategory]"
              as={`/${categorySlug}/${category.slug}`}
              onClick={
                scrollSpy ? setSelectedMenu.bind(this, category.id) : undefined
              }
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
      </Wrapper>
    </Placeholder>
  );
};

export default HorizontalCategories;
