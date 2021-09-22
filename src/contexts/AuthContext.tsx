import { createContext } from "react";
import { useEffect, useState } from "react";
import { supabase } from "src/libs/supabase";
import type { Session } from "@supabase/supabase-js";

type Props = {
  children?: JSX.Element;
};
type AuthContextProps = {
  session: Session | null;
};

export const AuthContext = createContext<AuthContextProps>({ session: null });

// eslint-disable-next-line react/destructuring-assignment
export const AuthProvider = ({ children }: Props) => {
  const [session, setSession] = useState<Session | null>(null);

  // const signOut = useCallback(() => {
  //   supabase.auth.signOut();
  // }, []);

  useEffect(() => {
    // setSession(supabase.auth.session());
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>;
};
