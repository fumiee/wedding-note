import { useRouter } from "next/router";
import { supabase } from "src/libs/supabase";

export const UserDelete = () => {
  const router = useRouter();
  const HandleUserDelete = async () => {
    const user = supabase.auth.user();
    if (!user) return;
    if (!process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY) return;
    try {
      await supabase.auth.api.deleteUser(user.id, process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY);
      router.push("/top");
    } catch (error) {
      console.error("error", error);
    }
  };
  return (
    <button className="py-1 px-5 bg-red-200 rounded-lg border-2 border-red-400" onClick={HandleUserDelete}>
      退会する
    </button>
  );
};
