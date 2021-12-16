import { useState } from "react";
import { supabase } from "src/libs/supabase";
import type { definitions } from "src/types/supabaseTypes";

type FavPost = {
  post_id: definitions["favorits"]["post_id"];
  post: {
    text: definitions["posts"]["text"];
    user: {
      name: definitions["profiles"]["name"];
      avatar: definitions["profiles"]["avatar"];
      user_id: definitions["profiles"]["user_id"];
    };
  };
};

//posts:ユーザーがお気に入りに入れている投稿一覧
//favorits:ユーザーがお気に入りに入れている投稿のpost_idを配列にしたもの
export const useFetchFavorits = () => {
  const [favorits, setFavorits] = useState<string[]>([]);
  const [posts, setPosts] = useState<FavPost[]>([]);

  const user = supabase.auth.user();

  const fetchFavorits = async () => {
    try {
      const res = await supabase
        .from("favorits")
        .select(
          `
        post_id,
        post:favorits_post_id_fkey(
          text,
          user:posts_user_id_fkey(
            name,
            avatar,
            user_id
          )
        )
        `
        )
        .eq("user_id", user?.id);
      if (res.error) throw res.error;
      setFavorits(
        res.data.map((d) => {
          return d.post_id;
        })
      );
      setPosts(res.data);
    } catch (error) {
      console.error("error", error);
    }
  };
  return { user, favorits, setFavorits, fetchFavorits, posts };
};
