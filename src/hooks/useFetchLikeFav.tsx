import { useFetchLikes } from "src/hooks/useFetchLikes";
import { useFetchFavorits } from "src/hooks/useFetchFavorits";

export const useFetchLikeFav = () => {
  const { likes, setLikes } = useFetchLikes();
  const { userId, favoritePostsArray, setFavoritePostsArray, favoritePosts } = useFetchFavorits();

  return { likes, setLikes, userId, favoritePostsArray, setFavoritePostsArray, favoritePosts };
};
