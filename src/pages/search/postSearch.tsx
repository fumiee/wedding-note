import { useCallback, useState } from "react";
import { LoginedLayout } from "src/components/layout/LoginedLayout";
import { SearchForm } from "src/components/search/SearchForm";
import { supabase } from "src/libs/supabase";
import type { definitions } from "src/types/supabaseTypes";
import { PostDisplay } from "src/components/display/PostDisplay";
import { useFetchLikeFav } from "src/hooks/useFetchLikeFav";

export type Post = {
  createdAt: definitions["posts"]["created_at"];
  text: definitions["posts"]["text"];
  id: definitions["posts"]["id"];
  user: {
    name: definitions["profiles"]["name"];
    avatar: definitions["profiles"]["avatar"];
    userId: definitions["profiles"]["user_id"];
  };
  name: definitions["profiles"]["name"];
  avatar: definitions["profiles"]["avatar"];
  userId: definitions["profiles"]["user_id"];
  weddingHall: definitions["profiles"]["wedding_hall"];
};

const PostSearch = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { likes, setLikes, userId, favoritePostsArray, setFavoritePostsArray } = useFetchLikeFav();

  const searchPosts = useCallback(async (word: string) => {
    if (!word) return;
    try {
      const res = await supabase
        .from("posts")
        .select(
          `
          createdAt:created_at,
          text,
          id,
          user:posts_user_id_fkey(
            name,
            avatar,
            userId:user_id
          )
          `
        )
        .like("text", `%${word}%`)
        .order("created_at", { ascending: false });
      if (res.error) throw res.error;
      setPosts(res.data);
    } catch (error) {
      console.error("error", error);
    }
  }, []);

  return (
    <LoginedLayout>
      <SearchForm how={"キロク"} handleSearch={searchPosts} />
      {posts.length !== 0 ? (
        <PostDisplay
          posts={posts}
          likes={likes}
          setLikes={setLikes}
          userId={userId}
          favoritePostsArray={favoritePostsArray}
          setFavoritePostsArray={setFavoritePostsArray}
        />
      ) : (
        <p className="mb-10 text-gray-400">not found</p>
      )}
    </LoginedLayout>
  );
};

export default PostSearch;
