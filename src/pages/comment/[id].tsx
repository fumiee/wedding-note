import { useRouter } from "next/router";
import { useEffect } from "react";
import { HandleAddComment } from "src/components/comment/HandleAddComment";
import { useGetComment } from "src/components/comment/useGetComment";

const Comment = () => {
  const router = useRouter();
  const { comments, fetchComments } = useGetComment({ postId: router.query.id as string });

  useEffect(() => {
    if (router.query.id === undefined) return;
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comments, router.query.id]);
  return (
    <div className="mt-14">
      <HandleAddComment postId={router.query.id as string} />
      {comments?.length === 0
        ? "コメントがありません"
        : comments.map((comment) => {
            return (
              <div key={comment.id} className="mb-10 bg-gray-100">
                <p>{comment.text}</p>
              </div>
            );
          })}
    </div>
  );
};

export default Comment;
