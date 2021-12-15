import type { PostgrestResponse } from "@supabase/postgrest-js";
import { useState } from "react";
import { supabase } from "src/libs/supabase";
import type { definitions } from "src/types/supabaseTypes";

export type Comment = {
  createdAt: definitions["comments"]["created_at"];
  id: definitions["comments"]["id"];
  text: definitions["comments"]["text"];
  postId: definitions["comments"]["post_id"];
  user: {
    name: definitions["profiles"]["name"];
    avatar: definitions["profiles"]["avatar"];
    user_id: definitions["profiles"]["user_id"];
  };
};
// Pick<definitions["comments"], "id" | "text" | "user_id" | "post_id" | "created_at">;

type Props = {
  postId: string;
};

export const useGetComment = (props: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = async () => {
    try {
      const res: PostgrestResponse<Comment> = await supabase
        .from("comments")
        .select(
          `
          id ,
          text,
          postId: post_id,
          createdAt:created_at,
          user:comments_user_id_fkey(
            name,
            avatar
            )
            `
        )
        .order("created_at", { ascending: false })
        .eq("post_id", props.postId);

      if (res.error) throw res.error;
      setComments(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  return { comments, fetchComments };
};
