import type { VFC } from "react";
import { useState } from "react";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { supabase } from "src/libs/supabase";

type Props = {
  postId: string;
};

export const Like: VFC<Props> = (props) => {
  const [isLike, setIsLike] = useState(false);

  const updateDisLike = async () => {
    try {
      await supabase.from("likes").delete().eq("post_id", props.postId);
    } catch (error) {
      console.error("error", error);
    }
  };

  const updateLike = async () => {
    try {
      const user = supabase.auth.user();
      const updates = {
        user_id: user?.id,
        post_id: props.postId,
        created_at: new Date(),
      };
      const { error } = await supabase.from("likes").upsert(updates, {
        returning: "minimal",
      });
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  const hadleClick = () => {
    isLike ? updateDisLike() : updateLike();
    setIsLike((isLike) => {
      return !isLike;
    });
  };

  return (
    <div className="flex justify-center">
      <button onClick={hadleClick}>
        {isLike ? (
          <IoHeartSharp size={22} color={"#5A5A5A"} className="" />
        ) : (
          <IoHeartOutline size={22} color={"#5A5A5A"} className="" />
        )}
      </button>
    </div>
  );
};
