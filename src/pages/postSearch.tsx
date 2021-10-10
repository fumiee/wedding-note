import { LoginedLayout } from "src/components/layout/LoginedLayout";
import { SearchForm } from "src/components/search/SearchForm";

const PostSearch = () => {
  return (
    <LoginedLayout>
      <SearchForm how={"キロク"} />
    </LoginedLayout>
  );
};

export default PostSearch;
