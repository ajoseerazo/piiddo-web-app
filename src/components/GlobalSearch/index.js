import React from "react";
import { GlobalSearchWrapper, TitleSearch } from "./styled";
import SearchBox from "../SearchBox";

const GlobalSearch = (props) => {
  return (
    <GlobalSearchWrapper {...props}>
      <TitleSearch>
        {props.address ? "¿Qué deseas pedir hoy?" : "¿Dónde te encuentras?"}
      </TitleSearch>

      <SearchBox address={props.address} onSelectPlace={props.onSelectPlace} />
    </GlobalSearchWrapper>
  );
};

GlobalSearch.defaultProps = {
  address: "",
};

export default GlobalSearch;
