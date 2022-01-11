import type { Post } from "src/pages/search/postSearch";
import type { PostgrestResponse } from "@supabase/postgrest-js";
import { useState } from "react";
import { supabase } from "src/libs/supabase";

//userIdに一致するpostを取得
export const useFetchUserPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const fetchPosts = async (userId: string) => {
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
            userId:user_id
          )
          `
        )
        .order("created_at", { ascending: false })
        .eq("user_id", userId);
      if (res.error) throw res.error;
      setPosts(res.data);
    } catch (error) {
      console.error("error", error);
    }
  };
  return { posts, setPosts, fetchPosts };
};
