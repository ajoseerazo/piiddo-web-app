import {
  SearchPageWrapper,
  FiltersWrapper,
  ContentWrapper,
  ResultsTitle,
} from "./styled";
import Filters from "../../components/SearchFilters";

const Search = ({ products, searchText }) => {
  console.log("Products", products);

  return (
    <>
      <SearchPageWrapper>
        <div>
          <FiltersWrapper>
            <Filters />
          </FiltersWrapper>

          <ContentWrapper>
            <ResultsTitle>Resultados para: {searchText}</ResultsTitle>
          </ContentWrapper>
        </div>
      </SearchPageWrapper>
    </>
  );
};

export default Search;
