import { useState, useEffect } from "react";
import { supabase } from "src/libs/supabase";
import { Auth } from "src/components/Auth";
import { Account } from "src/components/Account";
import { Header } from "src/components/Header";
import { Footer } from "src/components/Footer";
import type { Session } from "@supabase/supabase-js";

const Home: React.VFC = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <Header />
      </div>
      <div className="flex-1">{!session ? <Auth /> : <Account />}</div>
      <div className="h-48">
        <Footer />
      </div>
    </div>
  );
};
export default Home;
