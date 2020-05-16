import React from "react";
import { GlobalSearchWrapper, TitleSearch } from "./styled";
import SearchBox from "../SearchBox";

const GlobalSearch = (props) => {
  return (
    <GlobalSearchWrapper {...props}>
      <TitleSearch>¿Qué deseas pedir hoy?</TitleSearch>

      <SearchBox address={props.address} />
    </GlobalSearchWrapper>
  );
};

export default GlobalSearch;
