/* eslint-disable react/destructuring-assignment */
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { Layout } from "src/components/layout/Layout";
import { useEffect, useState } from "react";
import { supabase } from "src/libs/supabase";
import type { Session } from "@supabase/supabase-js";
import { Toaster } from "react-hot-toast";

// eslint-disable-next-line func-style
function MyApp({ Component, pageProps }: AppProps) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(supabase.auth.session());
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  return (
    <div>
      <Layout>
        <Component {...pageProps} session={session} />
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
}
export default MyApp;
