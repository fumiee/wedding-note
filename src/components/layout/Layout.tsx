import type { VFC } from "react";
import type { Session } from "@supabase/supabase-js";
import { Footer } from "src/components/layout/Footer";
import { GuestHeader } from "src/components/layout/GuestHeader";
import { LoginedHeader } from "src/components/layout/LoginedHeader";

export type SessionProps = {
  children: JSX.Element;
  session: Session | null;
};

export const Layout: VFC<SessionProps> = (props) => {
  return (
    <div className="m-auto max-w-3xl font-sans text-center text-gray-600">
      <div className="flex z-50 flex-col min-h-screen">
        <div className="sticky top-0 z-50">{props.session ? <LoginedHeader /> : <GuestHeader />}</div>
        <div className="flex-1 min-h-screen">{props.children}</div>
        <Footer />
      </div>
    </div>
  );
};
