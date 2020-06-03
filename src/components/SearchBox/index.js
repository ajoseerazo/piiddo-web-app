import React, { useState, useEffect, Suspense, useCallback } from "react";
import {
  SearchBoxWrapper,
  SearchBoxInput,
  SearchIconWrapper,
  SearchAddressButton,
} from "./styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Autocomplete from "../Autocomplete";
import Router from "next/router";
import withSearchAbility from "../../hocs/with-search-ability";

const SearchBox = (props) => {
  const {
    address,
    search: { onClickSearch, onChangeText, onKeyPress },
  } = props;

  return (
    <SearchBoxWrapper>
      <SearchBoxInput
        onChange={onChangeText}
        onKeyPress={onKeyPress}
        {...props}
        placeholder="Busca lo que quieras"
      />

      <SearchIconWrapper>
        <SearchAddressButton onClick={onClickSearch}>
          Buscar
        </SearchAddressButton>
      </SearchIconWrapper>
    </SearchBoxWrapper>
  );
};

export default withSearchAbility(SearchBox);
