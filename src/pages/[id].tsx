import type { PostgrestResponse } from "@supabase/postgrest-js";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "src/libs/supabase";
import type { Post } from "./postSearch";

type Comment = {
  id: string;
  text: string;
  user_id: string;
  post_id: string;
  created_at: string;
};

const useGetComment = () => {
  const [comment, setComment] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchComment();
  }, []);

  const fetchComment = async () => {
    try {
      const res: PostgrestResponse<Post> = await supabase
        .from("comments")
        .select("text,id,user_id,post_id")
        .order("created_at", { ascending: false })
        .eq("post_id", router.query.id);
      if (res.error) throw res.error;
      setComment(res.data);
    } catch (error) {
      console.error("error", error);
    }
    console.log(comment);
    console.log(router);
  };
  return (
    <div>
      {/* {comment?.length === 0
        ? "コメントがありません"
        : comment.map((comment) => {
            return (
              <div key={comment.id}>
                <p>{comment.text}</p>
                <p>{comment.user_id}</p>
              </div>
            );
          })} */}
      開発中です🙇‍♂️
    </div>
  );
};
export default useGetComment;
