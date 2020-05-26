import { useCallback, useState } from "react";
import { ToolbarWrapper } from "./styled";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch } from "@fortawesome/free-solid-svg-icons";
import Router from "next/router";
import MobileSearchModal from "../MobileSearchModal";

library.add([faHome, faSearch]);

const items = [
  {
    name: "Home",
    icon: "home",
    value: "home",
  },
  {
    name: "Search",
    icon: "search",
    value: "search",
  },
];

const Toolbar = () => {
  const [searchModalOpened, setSearchModalOpened] = useState(false);

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

  return (
    <>
      <ToolbarWrapper>
        {items.map((item, index) => {
          return (
            <div key={index}>
              <FontAwesomeIcon
                icon={item.icon}
                color="#f74342"
                onClick={onPressItem.bind(this, item.value)}
              />
            </div>
          );
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
