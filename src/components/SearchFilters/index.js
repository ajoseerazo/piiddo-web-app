import { Wrapper, FilterTitle, FiltersContent } from "./styled";

const SearchFilters = ({ onSelectFilter, typeSelected = "products" }) => {
  return (
    <Wrapper>
      <FilterTitle>Filtrar por</FilterTitle>

      <FiltersContent>
        <li
          className={
            typeSelected === "products" || !typeSelected ? "active" : undefined
          }
          onClick={() => onSelectFilter("products")}
        >
          Productos
        </li>
        <li
          className={typeSelected === "store" ? "active" : undefined}
          onClick={() => onSelectFilter("stores")}
        >
          Tiendas
        </li>
      </FiltersContent>
    </Wrapper>
  );
};

export default SearchFilters;
