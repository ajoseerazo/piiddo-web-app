import { Wrapper, FilterTitle, FiltersContent } from "./styled";

const SearchFilters = () => {
  return (
    <Wrapper>
      <FilterTitle>Filtrar por</FilterTitle>

      <FiltersContent>
        <li>Productos</li>
        <li>Tiendas</li>
      </FiltersContent>
    </Wrapper>
  );
};

export default SearchFilters;
