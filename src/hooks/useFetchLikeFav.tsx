// import type { FavPost } from "src/hooks/useFetchFavorits";
import type { definitions } from "src/types/supabaseTypes";
import { useEffect, useState } from "react";
import { supabase } from "src/libs/supabase";

export type FavPost = {
  id: definitions["posts"]["id"];
  favoritsId: definitions["favorits"]["post_id"];
  favoritsPost: {
    text: definitions["posts"]["text"];
    user: {
      name: definitions["profiles"]["name"];
      avatar: definitions["profiles"]["avatar"];
      userId: definitions["profiles"]["user_id"];
    };
  };
};

export const useFetchLikeFav = () => {
  //ユーザーがお気に入りに入れている投稿情報
  const [favoritePosts, setFavoritePosts] = useState<FavPost[]>([]);
  //ユーザーがお気に入りに入れている投稿のpost_idのみを配列にしたもの
  const [favoritePostsArray, setFavoritePostsArray] = useState<string[]>([]);
  //ユーザーがいいねしている投稿情報
  const [likes, setLikes] = useState<string[]>([]);

  const userId = supabase.auth.user()?.id;
  const fetch = async () => {
    try {
      const res = await supabase
        .from("profiles")
        .select(
          `
          likes:likes_user_id_fkey(
            likesId:post_id
          ),
          favorits:favorits_user_id_fkey(
            id,
            favoritsId:post_id,
            favoritsPost:favorits_post_id_fkey(
              text,
              user:posts_user_id_fkey(
                name,
                avatar,
                userId:user_id
              )
            )
          )  
          `
        )
        .eq("user_id", userId)
        .single();
      if (res.error) throw res.error;

      setLikes(
        res.data.likes.map((like: any) => {
          return like.likesId;
        })
      );
      setFavoritePosts(res.data.favorits);
      setFavoritePostsArray(
        res.data.favorits.map((fav: any) => {
          return fav.favoritsId;
        })
      );
    } catch (error) {
      console.error("error", error);
    }
  };
  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { likes, setLikes, userId, favoritePostsArray, setFavoritePostsArray, favoritePosts };
};
