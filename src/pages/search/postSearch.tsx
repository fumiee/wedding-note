import { useCallback, useState } from "react";
import { LoginedLayout } from "src/components/layout/LoginedLayout";
import { SearchForm } from "src/components/search/SearchForm";
import { supabase } from "src/libs/supabase";
import Image from "next/image";
import Link from "next/link";
import { useFetchLikes } from "src/hooks/useFetchLikes";
import { useFetchFavorits } from "src/hooks/useFetchFavorits";
import { LikeButton } from "src/components/home/like/LikeButton";
import { FavoriteButton } from "src/components/home/favorite/FavoriteButton";
import type { definitions } from "src/types/supabaseTypes";

export type Post = {
  createdAt: definitions["posts"]["created_at"];
  text: definitions["posts"]["text"];
  id: definitions["posts"]["id"];
  user: {
    name: definitions["profiles"]["name"];
    avatar: definitions["profiles"]["avatar"];
    user_id: definitions["profiles"]["user_id"];
  };
  name: definitions["profiles"]["name"];
  avatar: definitions["profiles"]["avatar"];
  user_id: definitions["profiles"]["user_id"];
  wedding_hall: definitions["profiles"]["wedding_hall"];
};

const PostSearch = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { likes, setLikes, fetchLikes } = useFetchLikes();
  const { favoritePostsArray, setFavoritePostsArray, fetchFavorits } = useFetchFavorits();

  const searchPosts = useCallback(
    async (word: string) => {
      if (!word) return;
      fetchLikes();
      fetchFavorits();
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
              user_id
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
    },
    [fetchFavorits, fetchLikes]
  );

  return (
    <LoginedLayout>
      <SearchForm how={"キロク"} handleSearch={searchPosts} />
      {posts.length !== 0 ? (
        posts.map((post) => {
          return (
            <div key={post.id} className="mb-10 bg-gray-200">
              <div className="flex justify-between min-w-max bg-gray-300">
                <Link href={`/${post.user.user_id}`}>
                  <a className="flex my-1 mx-2">
                    {post.user.avatar ? (
                      <Image src={post.user.avatar} alt="avatar" height={45} width={45} className="rounded-full" />
                    ) : (
                      <div className="bg-gray-200 rounded-full sm:w-28 sm:h-28" />
                    )}
                    <div className="flex items-center mx-3 text-sm">{post.user.name}</div>
                  </a>
                </Link>
                <div className="flex items-center space-x-4">
                  <LikeButton postId={post.id} likes={likes} setLikes={setLikes} />
                  <FavoriteButton
                    postId={post.id}
                    favoritePostsArray={favoritePostsArray}
                    setFavoritePostsArray={setFavoritePostsArray}
                  />
                </div>
              </div>
              <details className="block whitespace-pre-wrap break-words">
                <summary className="list-none">
                  <div className="px-2 text-left">{post.text.substr(0, 75)}</div>
                </summary>
                {post.text.length > 75 ? (
                  <div className="px-2 pb-1 text-left">{post.text.substr(75, 100000)}</div>
                ) : null}
              </details>
            </div>
          );
        })
      ) : (
        <p className="mb-10 text-gray-400">not found</p>
      )}
    </LoginedLayout>
  );
};

export default PostSearch;
