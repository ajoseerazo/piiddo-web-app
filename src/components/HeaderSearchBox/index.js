import { useCallback } from "react";
import { InputGroup, Input, InputGroupAddon } from "reactstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import withSearchAbility from "../../hocs/with-search-ability";

library.add([faSearch]);

const HeaderSearchBox = ({ search }) => {
  const { onClickSearch, onChangeText, onKeyPress } = search;

  return (
    <InputGroup>
      <Input
        className="search-input"
        placeholder="¿Qué quieres pedir hoy?"
        onChange={onChangeText}
        onKeyPress={onKeyPress}
      />
      <InputGroupAddon
        className="search-button"
        addonType="append"
        onClick={onClickSearch}
      >
        <span className="input-group-text">
          <FontAwesomeIcon icon="search" />
        </span>
      </InputGroupAddon>
    </InputGroup>
  );
};

export default withSearchAbility(HeaderSearchBox);
