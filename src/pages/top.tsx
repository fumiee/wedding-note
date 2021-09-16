import { Contents } from "src/components/Contents";
import { Entry } from "src/components/Entry";
import { Footer } from "src/components/Footer";
import { Header } from "src/components/Header";
import { Top } from "src/components/Top";

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
