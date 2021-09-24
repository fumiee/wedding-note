import { Footer } from "src/components/Footer";
import { LoginedHeader } from "src/components/LoginedHeader";
import { User } from "src/components/User";
import type { Session } from "@supabase/supabase-js";
import { Auth } from "src/components/Auth";

type Props = {
  session: Session;
};

const MyPage = (props: Props) => {
  return !props.session ? (
    <Auth />
  ) : (
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
