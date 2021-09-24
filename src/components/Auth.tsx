import { supabase } from "src/libs/supabase";
import { AiOutlineGoogle } from "react-icons/ai";
import { GuestLayout } from "./layout/GuestLayout";

export const Auth: React.VFC = () => {
  const handleLogin = async () => {
    await supabase.auth.signIn({
      provider: "google",
    });
  };
  return (
    <GuestLayout>
      <h1 className="mt-20 mb-2 text-xl">新規登録 / ログイン</h1>
      <p className="mb-16 text-sm">※google loginのみ対応しております。</p>
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
