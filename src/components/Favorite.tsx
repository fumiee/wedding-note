import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FavoriteButton } from "src/components/post/FavoriteButton";
import { LikeButton } from "src/components/post/LikeButton";
import { useFetchFavorits } from "src/libs/useFetchFavorits";
import { useFetchLikes } from "src/libs/useFetchLikes";
import { supabase } from "src/libs/supabase";
import type { definitions } from "src/types/supabase";
import type { PostgrestResponse } from "@supabase/postgrest-js";

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

export const Favorite = () => {
  const { likes, setLikes, fetchLikes } = useFetchLikes();
  const { favorits, setFavorits } = useFetchFavorits();
  const [posts, setPosts] = useState<FavPost[]>();

  const fetch = async () => {
    try {
      const res: PostgrestResponse<FavPost> = await supabase
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
        .order("created_at", { ascending: false });
      if (res.error) throw res.error;
      setPosts(res.data);
      setFavorits(
        res.data.map((d) => {
          return d.post_id;
        })
      );
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    fetch();
    fetchLikes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gray-200">
      <div>
        {posts?.map((post) => {
          return (
            <div key={post.post_id} className="mb-10 bg-gray-100">
              <div className=" flex min-w-max bg-gray-200">
                <Link href={`/${post.post.user.user_id}`}>
                  <a className="flex my-1 mx-2">
                    {post.post.user.avatar ? (
                      <Image src={post.post.user.avatar} alt="avatar" height={45} width={45} className="rounded-full" />
                    ) : (
                      <div className="bg-gray-100 rounded-full sm:w-28 sm:h-28" />
                    )}
                    <div className="flex items-center mx-3 text-sm">{post.post.user.name}</div>
                  </a>
                </Link>
                <div className="flex items-center space-x-3">
                  <LikeButton postId={post.post_id} likes={likes} setLikes={setLikes} />
                  <FavoriteButton postId={post.post_id} favorits={favorits} setFavorits={setFavorits} />
                </div>
              </div>
              <details className="block whitespace-pre-wrap break-words">
                <summary className="list-none">
                  <div className="px-2 text-left">{post.post.text.substr(0, 75)}</div>
                </summary>
                {post.post.text.length > 67 ? (
                  <div className="px-2 pb-1 text-left">{post.post.text.substr(75, 100000)}</div>
                ) : null}
              </details>
            </div>
          );
        })}
      </div>
    </div>
  );
};
