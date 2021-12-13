import type { VFC } from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { BiMessageRounded, BiMessageRoundedDots } from "react-icons/bi";
import { supabase } from "src/libs/supabase";

type Props = {
  postId: string;
};

export const CommentButton: VFC<Props> = (props) => {
  const [comments] = useState([]);
  const fetchComments = async () => {
    try {
      await supabase.from("comments").select("post_id").eq("post_id", props.postId);
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
