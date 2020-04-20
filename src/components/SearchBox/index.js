import React from "react";
import { SearchBoxWrapper, SearchBoxInput, SearchIconWrapper } from "./styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBox = (props) => {
  return (
    <SearchBoxWrapper>
      <SearchBoxInput {...props} placeholder="Busca lo que quieras" />

      <SearchIconWrapper>
        <FontAwesomeIcon icon="search" />
      </SearchIconWrapper>
    </SearchBoxWrapper>
  );
};

export default SearchBox;
