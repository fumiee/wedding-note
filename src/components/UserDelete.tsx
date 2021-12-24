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
      if (!res.ok) return alert("エラーです");
      router.push("/top");
    } catch (error) {
      console.error("error", error);
    }
    supabase.auth.signOut();
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
