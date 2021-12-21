import { useEffect, useState } from "react";
import { supabase } from "src/libs/supabase";
import type { definitions } from "src/types/supabaseTypes";

export const useFetchLikes = () => {
  const [likes, setLikes] = useState<string[]>([]);

  const fetchLikes = async () => {
    const user = supabase.auth.user();
    try {
      const res = await supabase.from<definitions["likes"]>("likes").select("post_id").eq("user_id", user?.id);
      if (res.error) throw res.error;

      setLikes(
        res.data.map((d) => {
          return d.post_id;
        })
      );
    } catch (error) {
      console.error("error", error);
    }
  };
  useEffect(() => {
    fetchLikes();
  }, []);
  return { likes, setLikes };
};
