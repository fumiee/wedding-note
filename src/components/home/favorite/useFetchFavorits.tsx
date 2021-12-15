import { useState } from "react";
import { supabase } from "src/libs/supabase";
import type { definitions } from "src/types/supabaseTypes";

export const useFetchFavorits = () => {
  const [favorits, setFavorits] = useState<string[]>([]);
  const user = supabase.auth.user();

  const fetchFavorits = async () => {
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
  return { user, favorits, setFavorits, fetchFavorits };
};
