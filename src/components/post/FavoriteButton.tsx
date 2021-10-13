import type { Dispatch, SetStateAction, VFC } from "react";
import { useMemo } from "react";
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import { supabase } from "src/libs/supabase";

type Props = {
  postId: string;
  favorits: string[];
  setFavorits: Dispatch<SetStateAction<string[]>>;
};

export const FavoriteButton: VFC<Props> = (props) => {
  const user = supabase.auth.user();

  //お気に入りを取り消す
  const updateDisKeep = async () => {
    try {
      await supabase.from("favorits").delete().eq("post_id", props.postId).eq("user_id", user?.id);
      props.setFavorits(
        props.favorits.filter((fav) => {
          return props.postId !== fav;
        })
      );
    } catch (error) {
      console.error("error", error);
    }
  };

  //お気に入りに追加
  const updateKeep = async () => {
    try {
      const updates = {
        user_id: user?.id,
        post_id: props.postId,
        created_at: new Date(),
      };
      const { error } = await supabase.from("favorits").upsert(updates, {
        returning: "minimal",
      });
      if (error) {
        throw error;
      }
      props.setFavorits([...props.favorits, props.postId]);
    } catch (error) {
      console.error("error", error);
    }
  };

  const hadleClick = () => {
    isFavorite ? updateDisKeep() : updateKeep();
  };

  const isFavorite = useMemo(() => {
    return props.favorits.some((fav) => {
      return props.postId === fav;
    });
  }, [props.favorits, props.postId]);

  return (
    <div className="flex justify-center">
      <button onClick={hadleClick}>
        {isFavorite ? (
          <IoBookmark size={22} color={"#3465E2"} className="opacity-90" />
        ) : (
          <IoBookmarkOutline size={25} color={"#5A5A5A"} />
        )}
      </button>
    </div>
  );
};
