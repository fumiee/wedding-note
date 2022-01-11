import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { PersonalSearch } from "src/components/mypage/PersonalSearch";
import { useFetchProfiles } from "src/hooks/useFetchProfiles";
import { useFetchUserPosts } from "src/hooks/useFetchUserPosts";
import { useFetchLikeFav } from "src/hooks/useFetchLikeFav";
import { PostDisplay } from "src/components/display/PostDisplay";

const Profile = () => {
  const router = useRouter();
  const { profile, fetchProfiles } = useFetchProfiles();
  const { posts, setPosts, fetchPosts } = useFetchUserPosts();
  const { likes, setLikes, userId, favoritePostsArray, setFavoritePostsArray } = useFetchLikeFav();

  useEffect(() => {
    if (!router.query.id) return;
    fetchProfiles(router.query.id as string);
    fetchPosts(router.query.id as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <div className="pt-5 bg-gray-100">
      <div className="space-y-8">
        <div className="flex justify-around">
          {profile?.avatar ? (
            <Image src={profile.avatar} alt="avatar" height={120} width={120} className="rounded-full" />
          ) : (
            <div className="bg-gray-200 rounded-full sm:w-28 sm:h-28 md:w-40 md:h-40" />
          )}
          <div className="">
            <label htmlFor="name" className="flex justify-start mt-5 mb-5 ml-3 w-36 text-gray-400">
              name
            </label>
            <p className="py-1 m-auto w-11/12 text-center bg-gray-200 rounded-lg">{profile?.name}</p>
          </div>
        </div>
        <div>
          <label htmlFor="wedding_hall" className="flex justify-start mb-5 ml-3 text-gray-400">
            wedding hall
          </label>
          <p className="py-1 m-auto w-11/12 text-center bg-gray-200 rounded-lg">{profile?.weddingHall}</p>
        </div>
        <div>
          <label htmlFor="description" className="flex justify-start mb-5 ml-3 text-gray-400">
            comment
          </label>
          <p className="py-1 m-auto w-11/12 text-center whitespace-pre-wrap break-words bg-gray-200 rounded-lg">
            {profile?.description}
          </p>
        </div>
      </div>
      <p className="mt-20">{profile?.name}さんのキロクで検索</p>

      <PersonalSearch userId={router.query.id as string} setPosts={setPosts} />
      {posts.length === 0 ? (
        <p className="mb-10">キロクがありません。</p>
      ) : (
        <PostDisplay
          posts={posts}
          likes={likes}
          setLikes={setLikes}
          userId={userId}
          favoritePostsArray={favoritePostsArray}
          setFavoritePostsArray={setFavoritePostsArray}
        />
      )}
    </div>
  );
};

export default Profile;
