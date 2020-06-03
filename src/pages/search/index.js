import {
  SearchPageWrapper,
  FiltersWrapper,
  ContentWrapper,
  ResultsTitle,
  MobileSearchWrapper,
} from "./styled";
import Filters from "../../components/SearchFilters";
import StoreResult from "../../components/StoreResult";
import HeaderSearchBox from "../../components/HeaderSearchBox";

const Search = ({ products, searchText }) => {
  return (
    <>
      <SearchPageWrapper>
        <div>
          <MobileSearchWrapper>
            <HeaderSearchBox />
          </MobileSearchWrapper>
          
          <FiltersWrapper>
            <Filters />
          </FiltersWrapper>

          <ContentWrapper>
            <ResultsTitle>Resultados para: {searchText}</ResultsTitle>

            {products &&
              Object.keys(products).map((key, index) => {
                return <StoreResult store={products[key]} key={index} />;
              })}
          </ContentWrapper>
        </div>
      </SearchPageWrapper>
    </>
  );
};

export default Search;
