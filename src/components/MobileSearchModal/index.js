import { useEffect, useState, useCallback } from "react";
import {
  MobileSearchModalWrapper,
  SearchWrapper,
  BodyWrapper,
  DisclaimerWrapper,
} from "./styled";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faTimes } from "@fortawesome/free-solid-svg-icons";
import debounce from "lodash.debounce";
import withSearchAbility from "../../hocs/with-search-ability";

library.add([faChevronLeft, faTimes]);

const MobileSearchModal = ({ isOpen, onClose, search }) => {
  const [searchText, setSearchText] = useState("");

  const { onChangeText, onKeyPress } = search;

  useEffect(() => {
    if (isOpen) {
      window.document.body.style.overflowY = "hidden";
    } else {
      window.document.body.style.overflowY = "auto";
    }
  }, [isOpen]);

  const onChangeSearch = useCallback(
    (e) => {
      setSearchText(e.target.value);

      onChangeText(e);
    },
    [setSearchText]
  );

  const onChangeSearchDebounce = debounce(onChangeSearch, 300);

  const clearSearchText = useCallback(() => {
    setSearchText("");
  }, [setSearchText]);

  return (
    <MobileSearchModalWrapper isOpen={isOpen}>
      <SearchWrapper>
        <FontAwesomeIcon icon="chevron-left" onClick={onClose} />

        <input
          placeholder="Buscar"
          value={searchText}
          onChange={onChangeSearch}
          onKeyPress={onKeyPress}
        />

        {searchText && (
          <FontAwesomeIcon icon="times" onClick={clearSearchText} />
        )}
      </SearchWrapper>

      <BodyWrapper>
        <DisclaimerWrapper>
          <p>
            Busca lo que necesites, desde{" "}
            <strong>comida rápida hasta una lista de mercado.</strong>
          </p>
          <p>Tus tiendas favoritas en la palma de tu mano</p>
        </DisclaimerWrapper>
      </BodyWrapper>
    </MobileSearchModalWrapper>
  );
};

export default withSearchAbility(MobileSearchModal);
