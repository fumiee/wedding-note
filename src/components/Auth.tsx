import { supabase } from "src/libs/supabase";
import { AiOutlineGoogle } from "react-icons/ai";
import { GuestLayout } from "src/components/layout/GuestLayout";

export const Auth: React.VFC = () => {
  const handleLogin = async () => {
    await supabase.auth.signIn(
      {
        provider: "google",
      },
      {
        redirectTo: process.env.NEXT_PUBLIC_SUPABASE_LOGINED_URL,
      }
    );
  };
  return (
    <GuestLayout>
      <h1 className="mt-24 mb-16 text-xl">新規登録 / ログイン</h1>
      {/* <p className="text-sm mb-">※google loginのみ対応しております。</p> */}
      <button
        onClick={() => {
          handleLogin();
        }}
        className="w-32 h-32 bg-gray-200 rounded-full"
      >
        <AiOutlineGoogle size={40} color={"#5A5A5A"} className="m-auto" />
        <p className="text-xs">google login</p>
      </button>
    </GuestLayout>
  );
};
