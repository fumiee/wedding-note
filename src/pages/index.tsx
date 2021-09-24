import { Account } from "src/components/Account";
import { Auth } from "src/components/Auth";
import type { Session } from "@supabase/supabase-js";

type Props = {
  session: Session;
};
const Home = (props: Props) => {
  return <div>{!props.session ? <Auth /> : <Account />}</div>;
};
export default Home;
