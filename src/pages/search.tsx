import { LoginedLayout } from "src/components/layout/LoginedLayout";
import { SearchForm } from "src/components/search/SearchForm";

const Search = () => {
  return (
    <LoginedLayout>
      <SearchForm />
    </LoginedLayout>
  );
};

export default Search;
