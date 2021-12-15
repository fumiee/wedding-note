import type { VFC } from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import type { PostgrestResponse } from "@supabase/postgrest-js";
import { BiMessageRounded, BiMessageRoundedDots } from "react-icons/bi";
import { supabase } from "src/libs/supabase";

type Props = {
  postId: string;
};

export const CommentButton: VFC<Props> = (props) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const fetchComments = async () => {
    try {
      const res: PostgrestResponse<Comment> = await supabase
        .from("comments")
        .select("text")
        .eq("post_id", props.postId);
      if (res.error) throw res.error;
      setComments(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex justify-center">
      <Link href={`comment/${props.postId}`}>
        <a>
          {comments.length === 0 ? (
            <BiMessageRounded size={22} color={"#6B7280"} />
          ) : (
            <BiMessageRoundedDots size={22} color={"#6B7280"} />
          )}
        </a>
      </Link>
    </div>
  );
};
