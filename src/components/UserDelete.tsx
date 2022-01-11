import toast from "react-hot-toast";
import type { VFC } from "react";
import { useRouter } from "next/router";
import { supabase } from "src/libs/supabase";

export const UserDelete: VFC = () => {
  const router = useRouter();
  const handleUserDelete = async () => {
    try {
      const session = supabase.auth.session();
      if (!session?.access_token) return;
      const res = await fetch("/api/delete-user", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (!res.ok) throw new Error();

      toast.success("退会しました");
      await supabase.auth.signOut();
      router.push("/topPage");
    } catch (error) {
      toast.error("エラーが発生しました");
    }
  };
  return (
    <button
      className="py-1 px-5 text-gray-500 bg-red-100 rounded-lg border-2 border-red-300"
      onClick={handleUserDelete}
    >
      退会する
    </button>
  );
};
