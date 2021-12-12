import type { VFC } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { supabase } from "src/libs/supabase";

type Props = { postId: string };

export const HandleAddComment: VFC<Props> = (props) => {
  const [comment, setComment] = useState("");

  const handleClick = async () => {
    try {
      const user = supabase.auth.user();
      if (comment && user?.id) {
        const newComment = { text: comment, user_id: user.id, post_id: props.postId };
        await supabase.from("comments").insert(newComment).single();
      }
    } catch (error) {
      console.error("error", error);
    }
    setComment("");
  };
  const inputComment = useCallback(
    (e) => {
      setComment(e.target.value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [comment]
  );
  return (
    <div>
      <textarea
        id="description"
        className="py-1 m-auto mb-3 w-full text-center bg-gray-200 rounded-lg"
        onChange={inputComment}
      />
      <div>
        <button onClick={handleClick} className="py-2 mb-10 w-32 tracking-widest text-white bg-gray-400 rounded-xl">
          送信
        </button>
      </div>
    </div>
  );
};
