import type { PostgrestResponse } from "@supabase/postgrest-js";
import type { Post } from "src/pages/postSearch";
import { supabase } from "src/libs/supabase";
import { useState } from "react";

export const useGetPost = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    try {
      const res: PostgrestResponse<Post> = await supabase
        .from("posts")
        .select(
          `
          createdAt:created_at,
          text,
          id,
          user:posts_user_id_fkey(
            name,
            avatar,
            user_id
          )
          `
        )
        .order("created_at", { ascending: false })
        .range(0, 4);
      if (res.error) throw res.error;
      setPosts(res.data);
    } catch (error) {
      console.error("error", error);
    }
  };
  return { fetchPosts, posts };
};
