import ShopHeader from "../src/components/ShopHeader/ShopHeader";

const Search = ({ address }) => {
  return (
    <>
      <ShopHeader address={address} hideBackButton />
      
      <div>Search</div>
    </>
  );
};

export default Search;
