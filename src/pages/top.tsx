import { Contents } from "src/components/intro/Contents";
import { Entry } from "src/components/intro/Entry";
import { Footer } from "src/components/Footer";
import { Header } from "src/components/intro/Header";
import { Top } from "src/components/intro/Top";

const Home = () => {
  return (
    <div>
      <Header />
      <Top />
      <Contents />
      <Entry />
      <Footer />
    </div>
  );
};

export default Home;
