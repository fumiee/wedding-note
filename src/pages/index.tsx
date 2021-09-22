import { useContext } from "react";
import { Account } from "src/components/Account";
import { Auth } from "src/components/Auth";
import { AuthContext } from "src/contexts/AuthContext";

//ログアウトしたら<Auth />に移動してほしい。
const Home = () => {
  const { session } = useContext(AuthContext);
  return <div className="flex-1">{!session ? <Auth /> : <Account />}</div>;
};
export default Home;
