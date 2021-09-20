import { Footer } from "src/components/Footer";
import { LoginedHeader } from "src/components/LoginedHeader";
import { User } from "src/components/User";

const MyPage: React.VFC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <LoginedHeader />
      <div className="flex-1">
        <User />
      </div>
      <Footer />
    </div>
  );
};

export default MyPage;
