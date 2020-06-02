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
// import API from "../../api";

const SearchBox = (props) => {
  const { address } = props;
  const [searchText, setSearchText] = useState("");

  const onChange = useCallback(({ target }) => {
    setSearchText(target.value);
  });

  const onClickSearchButton = useCallback(async () => {
    Router.push(`/search?query=${searchText.toLowerCase()}`)
    //const products = await API.Products.search(searchText);

    //console.log(products);
  }, [searchText]);

  return (
    <SearchBoxWrapper>
      {address === "" ? (
        <SearchBoxInput
          onChange={onChange}
          {...props}
          placeholder="Busca lo que quieras"
        />
      ) : (
        <Autocomplete
          placeholder="Ingresa la dirección de envío o un punto cercano"
          onSelect={async ({ lat, lng, value }) => {
            props.onSelectPlace({
              lat,
              lng,
              value,
            });
          }}
          style={{
            width: "100%",
          }}
          CustomComponent={SearchBoxInput}
        />
      )}

      <SearchIconWrapper>
        {address ? (
          <FontAwesomeIcon icon="search" />
        ) : (
          <SearchAddressButton onClick={onClickSearchButton}>
            Buscar
          </SearchAddressButton>
        )}
      </SearchIconWrapper>
    </SearchBoxWrapper>
  );
};

export default SearchBox;
