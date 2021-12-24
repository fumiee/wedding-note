import Link from "next/link";
import Image from "next/image";
import type { VFC } from "react";
import { FavoriteButton } from "src/components/home/favorite/FavoriteButton";
import { LikeButton } from "src/components/home/like/LikeButton";
import { EditPageLinkButton } from "src/components/home/edit/EditPageLinkButton";
import { CommentButton } from "src/components/home/comment/CommentButton";
import { useFetchLikeFav } from "src/hooks/useFetchLikeFav";

//お気に入り一覧ページに表示するpost情報の取得
export const FavoriteList: VFC = () => {
  const { likes, setLikes, userId, favoritePostsArray, setFavoritePostsArray, favoritePosts } = useFetchLikeFav();

  return (
    <div className="min-h-screen bg-gray-200">
      <div>
        {favoritePosts?.map((post) => {
          return (
            <div key={post.postId} className="mb-10 bg-gray-100">
              <div className="flex justify-between min-w-max bg-gray-200">
                <Link href={`profile/${post.post.user.userId}`}>
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
                  {post.post.user.userId === userId ? <EditPageLinkButton id={post.id} /> : <div className="w-6"></div>}
                  <CommentButton postId={post.id} />
                  <LikeButton postId={post.postId} likes={likes} setLikes={setLikes} />
                  <FavoriteButton
                    postId={post.postId}
                    favoritePostsArray={favoritePostsArray}
                    setFavoritePostsArray={setFavoritePostsArray}
                  />
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
