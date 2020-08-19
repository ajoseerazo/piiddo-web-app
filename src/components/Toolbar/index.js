import { useEffect, useCallback, useState, Suspense } from "react";
import { ToolbarWrapper, MenuItemWrapper } from "./styled";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch } from "@fortawesome/free-solid-svg-icons";
import Router from "next/router";
import MobileSearchModal from "../MobileSearchModal";
import { isMobile } from "react-device-detect";

const CitySelector = React.lazy(() => import("../CitySelector"));

library.add([faHome, faSearch]);

const items = [
  {
    name: "Home",
    icon: "home",
    value: "home",
  },
  {
    name: "CitySelector",
    icon: "city",
    value: "city",
  },
  {
    name: "Search",
    icon: "search",
    value: "search",
  },
];

const Toolbar = ({ disableCitySelector }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  const [searchModalOpened, setSearchModalOpened] = useState(false);

  useEffect(() => {
    if (typeof window !== undefined) {
      setIsBrowser(true);
    }
  }, []);

  const onPressItem = useCallback(
    (value) => {
      switch (value) {
        case "home":
          setSearchModalOpened(false);
          Router.push("/");
          break;
        case "search":
          setSearchModalOpened(true);
          break;
        default:
          break;
      }
    },
    [setSearchModalOpened]
  );

  const closeSearchModal = useCallback(() => {
    setSearchModalOpened(false);
  }, [setSearchModalOpened]);

  if (!isBrowser) {
    return <div></div>;
  }

  if (!isMobile) {
    return <div></div>;
  }

  return (
    <>
      <ToolbarWrapper>
        {items.map((item, index) => {
          if (item.value === "city") {
            return (
              <MenuItemWrapper>
                {isBrowser && (
                  <Suspense fallback={<div></div>}>
                    <CitySelector disabled={disableCitySelector} />
                  </Suspense>
                )}
              </MenuItemWrapper>
            );
          } else {
            return (
              <MenuItemWrapper key={index}>
                <FontAwesomeIcon
                  icon={item.icon}
                  color="#f74342"
                  onClick={onPressItem.bind(this, item.value)}
                />
              </MenuItemWrapper>
            );
          }
        })}
      </ToolbarWrapper>

      <MobileSearchModal
        isOpen={searchModalOpened}
        onClose={closeSearchModal}
      />
    </>
  );
};

export default Toolbar;
