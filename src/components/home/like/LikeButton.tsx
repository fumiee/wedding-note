import type { Dispatch, SetStateAction, VFC } from "react";
import type { LikesId } from "src/hooks/useFetchLikeFav";
import type { definitions } from "src/types/supabaseTypes";
import { useMemo } from "react";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { supabase } from "src/libs/supabase";

type Props = {
  postId: definitions["posts"]["id"];
  likes: LikesId[];
  setLikes: Dispatch<SetStateAction<LikesId[]>>;
};

export const LikeButton: VFC<Props> = (props) => {
  const user = supabase.auth.user();

  //いいねを取り消す
  const updateDisLike = async () => {
    try {
      await supabase.from("likes").delete().eq("post_id", props.postId).eq("user_id", user?.id);
      props.setLikes(
        props.likes.filter((like) => {
          return props.postId !== like;
        })
      );
    } catch (error) {
      console.error("error", error);
    }
  };

  //いいねをつける
  const updateLike = async () => {
    try {
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
      props.setLikes([...props.likes, props.postId]);
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleClick = () => {
    isLike ? updateDisLike() : updateLike();
  };

  const isLike = useMemo(() => {
    return props.likes.some((like) => {
      return props.postId === like;
    });
  }, [props.likes, props.postId]);

  return (
    <div className="flex justify-center">
      <button onClick={handleClick}>
        {isLike ? (
          <IoHeartSharp size={22} color={"#FB8989"} className="" />
        ) : (
          <IoHeartOutline size={22} color={"#5A5A5A"} />
        )}
      </button>
    </div>
  );
};
