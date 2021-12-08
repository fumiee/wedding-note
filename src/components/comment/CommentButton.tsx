import { useEffect } from "react";
import Link from "next/link";
import { BiMessageRounded, BiMessageRoundedDots } from "react-icons/bi";
import { useGetComment } from "./useGetComment";

export const CommentButton = (props: any) => {
  const { comments, fetchComments } = useGetComment(props.postId);

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
