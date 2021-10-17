import { User } from "src/components/User";
import type { Session } from "@supabase/supabase-js";
import { Auth } from "src/components/Auth";
import { LoginedLayout } from "src/components/layout/LoginedLayout";

type Props = {
  session: Session;
};

const MyPage = (props: Props) => {
  return !props.session ? (
    <Auth />
  ) : (
    <div className="bg-gray-100">
      <LoginedLayout>
        <div className="flex-1">
          <User />
        </div>
      </LoginedLayout>
    </div>
  );
};

export default MyPage;
