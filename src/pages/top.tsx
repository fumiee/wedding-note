import { Contents } from "src/components/intro/Contents";
import { Entry } from "src/components/intro/Entry";
import { LatestPosts } from "src/components/intro/LatestPosts";
import { Top } from "src/components/intro/Top";
import { GuestLayout } from "src/components/layout/GuestLayout";

const Home = () => {
  return (
    <div>
      <GuestLayout>
        <Top />
        <Contents />
        <LatestPosts />
        <Entry />
      </GuestLayout>
    </div>
  );
};

export default Home;
