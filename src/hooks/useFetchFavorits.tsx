import { useEffect, useState } from "react";
import { supabase } from "src/libs/supabase";
import type { definitions } from "src/types/supabaseTypes";

export type FavPost = {
  id: definitions["posts"]["id"];
  postId: definitions["favorits"]["post_id"];
  post: {
    text: definitions["posts"]["text"];
    user: {
      name: definitions["profiles"]["name"];
      avatar: definitions["profiles"]["avatar"];
      userId: definitions["profiles"]["user_id"];
    };
  };
};

//favoritePosts:ユーザーがお気に入りに入れている投稿情報
//favoritePostsArray:ユーザーがお気に入りに入れている投稿のpost_idのみを配列にしたもの
export const useFetchFavorits = () => {
  const [favoritePostsArray, setFavoritePostsArray] = useState<string[]>([]);
  const [favoritePosts, setFavoritePosts] = useState<FavPost[]>([]);

  const userId = supabase.auth.user()?.id;

  const fetchFavorits = async () => {
    try {
      const res = await supabase
        .from("favorits")
        .select(
          `
          id,  
          postId:post_id,
          post:favorits_post_id_fkey(
            text,
            user:posts_user_id_fkey(
              name,
              avatar,
              userId:user_id
            )
          )
          `
        )
        .eq("user_id", userId);
      if (res.error) throw res.error;
      setFavoritePostsArray(
        res.data.map((d) => {
          return d.postId;
        })
      );
      setFavoritePosts(res.data);
    } catch (error) {
      console.error("error", error);
    }
  };
  useEffect(() => {
    fetchFavorits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { userId, favoritePostsArray, setFavoritePostsArray, favoritePosts };
};
