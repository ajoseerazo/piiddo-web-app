import React, { useState, useEffect, Suspense } from "react";
import {
  SearchBoxWrapper,
  SearchBoxInput,
  SearchIconWrapper,
  SearchAddressButton,
} from "./styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Autocomplete from "../Autocomplete";

const SearchBox = (props) => {
  const { address } = props;

  return (
    <SearchBoxWrapper>
      {address ? (
        <SearchBoxInput {...props} placeholder="Busca lo que quieras" />
      ) : (
        <Autocomplete
          placeholder="Ingresa la dirección de envío o un punto cercano"
          onSelect={async ({ lat, lng, value }) => {
            console.log(lat, lng);
            console.log(value);
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
          <SearchAddressButton>Buscar</SearchAddressButton>
        )}
      </SearchIconWrapper>
    </SearchBoxWrapper>
  );
};

export default SearchBox;
