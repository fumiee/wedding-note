import type { Post } from "src/components/post/Posts";
import type { PostgrestResponse } from "@supabase/postgrest-js";
import { useState } from "react";
import { supabase } from "src/libs/supabase";

export const useFetchPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const fetchPosts = async (query: string) => {
    try {
      const res: PostgrestResponse<Post> = await supabase
        .from("posts")
        .select("text,id")
        .order("created_at", { ascending: false })
        .eq("user_id", query);
      if (res.error) throw res.error;
      setPosts(res.data);
    } catch (error) {
      console.error("error", error);
    }
  };
  return { posts, setPosts, fetchPosts };
};
