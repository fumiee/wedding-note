import { LoginedLayout } from "src/components/layout/LoginedLayout";
import { SearchForm } from "src/components/search/SearchForm";

const WhSearch = () => {
  return (
    <LoginedLayout>
      <SearchForm how={"結婚式場"} />
    </LoginedLayout>
  );
};

export default WhSearch;
