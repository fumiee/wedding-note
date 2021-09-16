import { supabase } from "src/libs/supabase";
import { AiOutlineGoogle } from "react-icons/ai";

export const Auth: React.VFC = () => {
  const handleLogin = async () => {
    const { user, session, error } = await supabase.auth.signIn({
      provider: "google",
    });
  };
  return (
    <div className="mt-16 mb-24">
      <h1 className="mb-2 text-xl">新規登録 / ログイン</h1>
      <p className=" mb-20 text-sm">※google loginのみ対応しております。</p>
      <button
        onClick={() => {
          handleLogin();
        }}
        className="w-32 h-32 bg-gray-200 rounded-full"
      >
        <AiOutlineGoogle size={30} color={"#5A5A5A"} className="m-auto" />
        <p className="mt-1">google login</p>
      </button>
    </div>
  );
};