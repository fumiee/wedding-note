import { LoginedLayout } from "src/components/layout/LoginedLayout";
import { SearchForm } from "src/components/search/SearchForm";

const NameSearch = () => {
  return (
    <LoginedLayout>
      <SearchForm how={"ナマエ"} />
    </LoginedLayout>
  );
};

export default NameSearch;
