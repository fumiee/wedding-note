import { useEffect } from "react";
import type { definitions } from "src/types/supabase";
import { AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import { useGetPost } from "src/libs/useGetPost";
import { LikeButton } from "src/components/post/LikeButton";
import { FavoriteButton } from "src/components/post/FavoriteButton";
import { useFetchFavorits } from "src/libs/useFetchFavorits";
import { useFetchLikes } from "src/libs/useFetchLikes";

export type Post = {
  createdAt: definitions["posts"]["created_at"];
  text: definitions["posts"]["text"];
  id: definitions["posts"]["id"];
  user: {
    name: definitions["profiles"]["name"];
    avatar: definitions["profiles"]["avatar"];
    user_id: definitions["profiles"]["user_id"];
    wedding_hall?: definitions["profiles"]["wedding_hall"];
    description?: definitions["profiles"]["description"];
  };
  name: definitions["profiles"]["name"];
  avatar: definitions["profiles"]["avatar"];
  user_id: definitions["profiles"]["user_id"];
  wedding_hall?: definitions["profiles"]["wedding_hall"];
  description?: definitions["profiles"]["description"];
};

export const Posts = () => {
  const { fetchposts, posts } = useGetPost(); //postsは表示する記事
  const { likes, setLikes, fetchLikes } = useFetchLikes(); //自分がいいねしたpost_idを全部取得
  const { favorits, setFavorits, fetchFavorits } = useFetchFavorits(); //自分がお気に入りしたpost_idを全部取得

  useEffect(() => {
    fetchposts();
    fetchLikes();
    fetchFavorits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gray-300">
      <div>
        {posts?.map((post) => {
          return (
            <div key={post.id} className="mb-10 bg-gray-100">
              <div className=" flex min-w-max bg-gray-300">
                <Link href={`/${post.user.user_id}`}>
                  <a className="flex my-1 mx-2">
                    {post.user.avatar ? (
                      <Image src={post.user.avatar} alt="avatar" height={45} width={45} className="rounded-full" />
                    ) : (
                      <div className="bg-gray-100 rounded-full sm:w-28 sm:h-28" />
                    )}
                    <div className="flex items-center mx-3 text-sm">{post.user.name}</div>
                  </a>
                </Link>
                <div className="flex items-center space-x-3">
                  <LikeButton postId={post.id} likes={likes} setLikes={setLikes} />
                  <FavoriteButton postId={post.id} favorits={favorits} setFavorits={setFavorits} />
                </div>
              </div>
              <details className="block whitespace-pre-wrap break-words">
                <summary className="list-none">
                  <div className="px-2 text-left">{post.text.substr(0, 75)}</div>
                </summary>
                {post.text.length > 67 ? (
                  <div className="px-2 pb-1 text-left">{post.text.substr(75, 100000)}</div>
                ) : null}
              </details>
            </div>
          );
        })}
      </div>
      <div className="flex sticky bottom-2 justify-end mr-2">
        <Link href="/compose">
          <a className="bg-transparent">
            <AiOutlinePlus size={50} color={"#fff"} className="bg-gray-600 rounded-full" />
          </a>
        </Link>
      </div>
    </div>
  );
};
