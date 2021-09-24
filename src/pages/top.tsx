import { Contents } from "src/components/intro/Contents";
import { Entry } from "src/components/intro/Entry";
import { Top } from "src/components/intro/Top";
import { GuestLayout } from "src/components/layout/GuestLayout";

const Home = () => {
  return (
    <div>
      <GuestLayout>
        <Top />
        <Contents />
        <Entry />
      </GuestLayout>
    </div>
  );
};

export default Home;
