import { useState } from "react";
import { supabase } from "src/libs/supabase";
import type { definitions } from "src/types/supabase";

export const useFetchFavorits = () => {
  const [favorits, setFavorits] = useState<string[]>([]);

  const fetchFavorits = async () => {
    const user = supabase.auth.user();

    try {
      const res = await supabase.from<definitions["favorits"]>("favorits").select("post_id").eq("user_id", user?.id);
      if (res.error) throw res.error;
      setFavorits(
        res.data.map((d) => {
          return d.post_id;
        })
      );
    } catch (error) {
      console.error("error", error);
    }
  };
  return { favorits, setFavorits, fetchFavorits };
};
