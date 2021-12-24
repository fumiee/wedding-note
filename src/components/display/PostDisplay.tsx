import Image from "next/image";
import Link from "next/link";
import type { Dispatch, SetStateAction, VFC } from "react";
import type { Post } from "src/pages/search/postSearch";
import { LikeButton } from "src/components/home/like/LikeButton";
import { FavoriteButton } from "src/components/home/favorite/FavoriteButton";
import { EditPageLinkButton } from "src/components/home/edit/EditPageLinkButton";
import { CommentButton } from "src/components/home/comment/CommentButton";

type PostDisplayProps = {
  posts: Post[];
  likes: string[];
  setLikes: Dispatch<SetStateAction<string[]>>;
  userId: string | undefined;
  favoritePostsArray: string[];
  setFavoritePostsArray: Dispatch<SetStateAction<string[]>>;
};

export const PostDisplay: VFC<PostDisplayProps> = (props) => {
  return (
    <div className="min-h-screen bg-gray-300">
      {props.posts.map((post) => {
        return (
          <div key={post.id} className="mb-10 bg-gray-100">
            <div className="flex justify-between min-w-max bg-gray-300">
              <Link href={`/profile/${post.user?.userId}`}>
                <a className="flex my-1 mx-2">
                  {post.user?.avatar ? (
                    <Image src={post.user.avatar} alt="avatar" height={45} width={45} className="rounded-full" />
                  ) : (
                    <div className="w-11 h-11 bg-gray-100 rounded-full" />
                  )}
                  <div className="flex items-center mx-3 text-sm">{post.user?.name}</div>
                </a>
              </Link>

              <p>{post.createdAt}</p>
              <div className="flex items-center space-x-4">
                {post.user?.userId === props.userId ? <EditPageLinkButton id={post.id} /> : <div className="w-6"></div>}
                <CommentButton postId={post.id} />
                <LikeButton postId={post.id} likes={props.likes} setLikes={props.setLikes} />
                <FavoriteButton
                  postId={post.id}
                  favoritePostsArray={props.favoritePostsArray}
                  setFavoritePostsArray={props.setFavoritePostsArray}
                />
              </div>
            </div>
            <details className="block whitespace-pre-wrap break-words">
              <summary className="list-none">
                <div className="px-2 text-left">{post.text}</div>
              </summary>
            </details>
          </div>
        );
      })}
    </div>
  );
};
