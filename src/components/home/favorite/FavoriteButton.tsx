import type { Dispatch, SetStateAction, VFC } from "react";
import type { FavoritsId } from "src/hooks/useFetchLikeFav";
import type { definitions } from "src/types/supabaseTypes";
import { useMemo } from "react";
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import { supabase } from "src/libs/supabase";

type Props = {
  postId: definitions["posts"]["id"];
  favoritePostsArray: FavoritsId[];
  setFavoritePostsArray: Dispatch<SetStateAction<FavoritsId[]>>;
};

export const FavoriteButton: VFC<Props> = (props) => {
  const user = supabase.auth.user();

  //お気に入りを取り消す
  const updateDisKeep = async () => {
    try {
      await supabase.from("favorits").delete().eq("post_id", props.postId).eq("user_id", user?.id);
      props.setFavoritePostsArray(
        props.favoritePostsArray.filter((fav) => {
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
      props.setFavoritePostsArray([...props.favoritePostsArray, props.postId]);
    } catch (error) {
      console.error("error", error);
    }
  };

  const hadleClick = () => {
    isFavorite ? updateDisKeep() : updateKeep();
  };

  const isFavorite = useMemo(() => {
    return props.favoritePostsArray.some((fav) => {
      return props.postId === fav;
    });
  }, [props.favoritePostsArray, props.postId]);

  return (
    <div className="flex justify-center pr-3">
      <button onClick={hadleClick}>
        {isFavorite ? (
          <IoBookmark size={23} color={"#5A5A5A"} className="opacity-90" />
        ) : (
          <IoBookmarkOutline size={23} color={"#5A5A5A"} />
        )}
      </button>
    </div>
  );
};
