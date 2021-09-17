import { useState, useEffect } from "react";
import { supabase } from "src/libs/supabase";
import { Auth } from "src/components/Auth";
import { Account } from "src/components/Account";
import type { Session } from "@supabase/supabase-js";

const Home: React.VFC = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return <div className="flex-1">{!session ? <Auth /> : <Account />}</div>;
};
export default Home;
