import type { PostgrestResponse } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "src/libs/supabase";
import type { definitions } from "src/types/supabaseTypes";

type Likes = {
  postId: definitions["likes"]["post_id"];
};

export const useFetchLikes = () => {
  const [likes, setLikes] = useState<string[]>([]);

  const fetchLikes = async () => {
    const user = supabase.auth.user();
    try {
      const res: PostgrestResponse<Likes> = await supabase
        .from("likes")
        .select("postId:post_id")
        .eq("user_id", user?.id);
      if (res.error) throw res.error;
      setLikes(
        res.data.map((d) => {
          return d.postId;
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
