import Link from "next/link";
import { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { PostDisplay } from "src/components/display/PostDisplay";
import { useFetchLikeFav } from "src/hooks/useFetchLikeFav";
import { useGetPost } from "src/hooks/useGetPost";

export const PostList = () => {
  const { likes, setLikes, userId, favoritePostsArray, setFavoritePostsArray } = useFetchLikeFav();
  const { fetchPosts, posts } = useGetPost();

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likes]);

  return (
    <div>
      <PostDisplay
        posts={posts}
        likes={likes}
        setLikes={setLikes}
        userId={userId}
        favoritePostsArray={favoritePostsArray}
        setFavoritePostsArray={setFavoritePostsArray}
      />
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
