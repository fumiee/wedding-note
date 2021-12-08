import type { PostgrestResponse } from "@supabase/postgrest-js";
import { useState } from "react";
import { supabase } from "src/libs/supabase";
import type { definitions } from "types/supabase";

export type Comment = Pick<definitions["comments"], "id" | "text" | "user_id" | "post_id" | "created_at">;

type Props = {
  postId: string;
};

export const useGetComment = (props: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = async () => {
    try {
      const res: PostgrestResponse<Comment> = await supabase
        .from("comments")
        .select("id ,text , user_id, post_id ,created_at")
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
