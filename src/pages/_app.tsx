import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import type { Session } from "@supabase/supabase-js";
import { Layout } from "src/components/layout/Layout";
import { useEffect, useState } from "react";
import { supabase } from "src/libs/supabase";
import { Toaster } from "react-hot-toast";

// eslint-disable-next-line react/destructuring-assignment
const MyApp = ({ Component, pageProps }: AppProps) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(supabase.auth.session());
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => {
      authListener?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Layout>
        <div>
          <Component {...pageProps} session={session} />
        </div>
      </Layout>
      <Toaster
        toastOptions={{
          className: "",
          duration: 2000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </div>
  );
};
export default MyApp;
