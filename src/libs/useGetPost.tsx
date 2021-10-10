import { supabase } from "src/libs/supabase";
import type { PostgrestResponse } from "@supabase/postgrest-js";
import { useState } from "react";
import type { Post } from "src/components/post/Posts";

export const useGetPost = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchposts = async () => {
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
        .range(0, 5);
      if (res.error) throw res.error;
      setPosts(res.data);
    } catch (error) {
      console.error("error", error);
    }
  };
  return { fetchposts, posts };
};
