import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HandleAddComment } from "src/components/comment/HandleAddComment";
import { useGetComment } from "src/components/comment/useGetComment";
import Image from "next/image";

const Comment = () => {
  const [comment, setComment] = useState("");
  const router = useRouter();
  const { comments, fetchComments } = useGetComment({ postId: router.query.id as string });

  useEffect(() => {
    if (router.query.id === undefined) return;
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.id]);
  return (
    <div className="mt-14">
      <HandleAddComment postId={router.query.id as string} comment={comment} setComment={setComment} />
      {comments?.length === 0
        ? "コメントがありません"
        : comments.map((comment) => {
            return (
              <div key={comment.id} className="mb-10">
                <div className=" flex min-w-max bg-gray-100 rounded-lg">
                  <a className="flex py-1 px-2 bg-gray-200 rounded-l-lg">
                    {comment.user.avatar ? (
                      <Image src={comment.user.avatar} alt="avatar" height={45} width={45} className="rounded-full" />
                    ) : (
                      <div className="bg-gray-200 rounded-full sm:w-28 sm:h-28" />
                    )}
                    <div className="flex items-center mx-3 text-sm">{comment.user.name}</div>
                  </a>
                  <p className="my-auto ml-5">{comment.text}</p>
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default Comment;
