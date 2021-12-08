import { useRouter } from "next/router";
import { useEffect } from "react";
import { useGetComment } from "src/components/comment/useGetComment";

const Comment = () => {
  const router = useRouter();
  const { comments, fetchComments } = useGetComment({ postId: router.query.id as string });

  useEffect(() => {
    if (router.query.id === undefined) return;
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.id]);
  return (
    <div>
      {comments?.length === 0
        ? "コメントがありません"
        : comments.map((comment) => {
            return (
              <div key={comment.id}>
                <p>{comment.text}</p>
                <p>{comment.user_id}</p>
              </div>
            );
          })}
      {/* 開発中です🙇‍♂️ */}
    </div>
  );
};

export default Comment;
