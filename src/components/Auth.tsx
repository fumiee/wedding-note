import { supabase } from "src/libs/supabase";
import { AiOutlineGoogle } from "react-icons/ai";
import { Header } from "./intro/Header";
import { Footer } from "./Footer";

export const Auth: React.VFC = () => {
  const handleLogin = async () => {
    await supabase.auth.signIn({
      provider: "google",
    });
  };
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 mt-16 mb-24">
        <h1 className="mb-2 text-xl">新規登録 / ログイン</h1>
        <p className="mb-16 text-sm">※google loginのみ対応しております。</p>
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
      <Footer />
    </div>
  );
};
