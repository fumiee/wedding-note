import { useEffect } from "react";
// import { useGetPost } from "src/hooks/useGetPost";
import { useFetchLikes } from "src/hooks/useFetchLikes";
import { useFetchFavorits } from "src/hooks/useFetchFavorits";

export const useFetchLikeFav = () => {
  // const { fetchPosts, posts } = useGetPost(); //postsは表示する記事
  const { likes, setLikes, fetchLikes } = useFetchLikes(); //ユーザーがいいねしたpost_id一覧を取得
  const { userId, favoritePostsArray, setFavoritePostsArray, fetchFavorits } = useFetchFavorits(); //ユーザーがお気に入りしたpost_id一覧を取得

  useEffect(() => {
    // fetchPosts();
    fetchLikes();
    fetchFavorits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { likes, setLikes, userId, favoritePostsArray, setFavoritePostsArray };
};
