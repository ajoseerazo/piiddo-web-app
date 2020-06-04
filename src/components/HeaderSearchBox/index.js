import { InputGroup,  } from "reactstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import withSearchAbility from "../../hocs/with-search-ability";
import { InputStyled, SearchButtonWrapper } from "./styled";

library.add([faSearch]);

const HeaderSearchBox = ({ search }) => {
  const { onClickSearch, onChangeText, onKeyPress } = search;

  return (
    <InputGroup>
      <InputStyled
        placeholder="¿Qué quieres pedir hoy?"
        onChange={onChangeText}
        onKeyPress={onKeyPress}
      />
      <SearchButtonWrapper
        className="search-button"
        addonType="append"
        onClick={onClickSearch}
      >
        <span className="input-group-text">
          <FontAwesomeIcon icon="search" />
        </span>
      </SearchButtonWrapper>
    </InputGroup>
  );
};

export default withSearchAbility(HeaderSearchBox);
