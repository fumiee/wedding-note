import { useRouter } from "next/router";
import type { VFC } from "react";
import { useCallback } from "react";
import { supabase } from "src/libs/supabase";

type Props = { postId: string; comment: string; setComment: (comment: string) => void };

export const HandleAddComment: VFC<Props> = (props) => {
  const router = useRouter();

  const handleClick = async () => {
    try {
      const user = supabase.auth.user();
      if (props.comment && user?.id) {
        const newComment = { text: props.comment, user_id: user.id, post_id: props.postId };
        await supabase.from("comments").insert(newComment).single();
        props.setComment("");
        router.reload();
      }
    } catch (error) {
      console.error("error", error);
    }
  };
  const inputComment = useCallback(
    (e) => {
      props.setComment(e.target.value);
    },
    [props]
  );
  return (
    <div>
      <textarea id="description" className="px-5 my-auto mb-3 w-full bg-gray-200 rounded-lg" onChange={inputComment} />
      <div>
        <button onClick={handleClick} className="py-2 mb-10 w-32 tracking-widest text-white bg-gray-400 rounded-xl">
          送信
        </button>
      </div>
    </div>
  );
};
