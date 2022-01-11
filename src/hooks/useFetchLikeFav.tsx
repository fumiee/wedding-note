import type { definitions } from "src/types/supabaseTypes";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "src/libs/supabase";

export type LikeFavPost = {
  likes: {
    likesId: LikesId;
  }[];
  favorits: {
    id: definitions["posts"]["id"];
    favoritsId: FavoritsId;
    favoritsPost: {
      text: definitions["posts"]["text"];
      user: {
        name: definitions["profiles"]["name"];
        avatar: definitions["profiles"]["avatar"];
        userId: definitions["profiles"]["user_id"];
      };
    };
  }[];
};

export type LikesId = definitions["likes"]["post_id"];

export type FavoritsId = definitions["favorits"]["post_id"];

export const useFetchLikeFav = () => {
  //ユーザーがお気に入りに入れている投稿情報
  const [favoritePosts, setFavoritePosts] = useState<LikeFavPost["favorits"]>([]);
  //ユーザーがお気に入りに入れている投稿のpost_idのみを配列にしたもの
  const [favoritePostsArray, setFavoritePostsArray] = useState<FavoritsId[]>([]);
  //ユーザーがいいねしている投稿情報
  const [likes, setLikes] = useState<LikesId[]>([]);

  const userId = supabase.auth.user()?.id;
  const fetch = async () => {
    try {
      const res: PostgrestSingleResponse<LikeFavPost> = await supabase
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
      if (res.data === undefined) throw new Error("useFetchLikeFavが失敗しました");

      //{}を外すためのmap
      setLikes(
        res.data.likes.map((like) => {
          return like.likesId;
        })
      );
      // setLikes(res.data.likes);
      setFavoritePosts(res.data.favorits);
      setFavoritePostsArray(
        res.data.favorits.map((fav) => {
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
