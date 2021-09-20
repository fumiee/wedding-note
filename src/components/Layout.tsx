import { useEffect, useState } from "react";
import { supabase } from "src/libs/supabase";
import type { Session } from "@supabase/supabase-js";
import { Auth } from "./Auth";

type Props = {
  children: any;
};

export const Layout: React.VFC<Props> = (props) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(supabase.auth.session());
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => {
      authListener?.unsubscribe();
    };
  }, [session]);
  return <div className="m-auto font-sans text-center text-gray-600">{!session ? <Auth /> : props.children}</div>;
};
