import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { FavoriteButton } from "src/components/home/favorite/FavoriteButton";
import { LikeButton } from "src/components/home/like/LikeButton";
import { useFetchFavorits } from "src/hooks/useFetchFavorits";
import { useFetchLikes } from "src/hooks/useFetchLikes";

//お気に入り一覧ページに表示するpost情報の取得
export const FavoriteList = () => {
  const { likes, setLikes, fetchLikes } = useFetchLikes();
  const { favorits, setFavorits, fetchFavorits, posts } = useFetchFavorits();

  useEffect(() => {
    fetchFavorits();
    fetchLikes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gray-200">
      <div>
        {posts?.map((post) => {
          return (
            <div key={post.post_id} className="mb-10 bg-gray-100">
              <div className="flex justify-between min-w-max bg-gray-200">
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
                <div className="flex items-center space-x-4">
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
