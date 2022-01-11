import { Contents } from "src/components/intro/Contents";
import { Entry } from "src/components/intro/Entry";
import { LatestPosts } from "src/components/intro/LatestPosts";
import { Top } from "src/components/intro/Top";

const TopPage = () => {
  return (
    <div>
      <Top />
      <Contents />
      <LatestPosts />
      <Entry />
    </div>
  );
};

export default TopPage;
