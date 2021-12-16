import { useRouter } from "next/router";
import { useEffect } from "react";
import { LoginedLayout } from "src/components/layout/LoginedLayout";
import { PersonalSearch } from "src/components/mypage/PersonalSearch";
import { useFetchProfiles } from "src/hooks/useFetchProfiles";
import Image from "next/image";
import { LikeButton } from "src/components/home/like/LikeButton";
import { FavoriteButton } from "src/components/home/favorite/FavoriteButton";
import { useFetchLikes } from "src/hooks/useFetchLikes";
import { useFetchFavorits } from "src/hooks/useFetchFavorits";
import { useFetchPosts } from "src/hooks/useFetchPosts";

const Profile = () => {
  const router = useRouter();
  const { profile, fetchProfiles } = useFetchProfiles();
  const { posts, setPosts, fetchPosts } = useFetchPosts();
  const { likes, setLikes, fetchLikes } = useFetchLikes();
  const { favorits, setFavorits, fetchFavorits } = useFetchFavorits();
  useEffect(() => {
    if (!router.query.id) return;
    fetchProfiles(router.query.id as string);
    fetchPosts(router.query.id as string);
    fetchLikes();
    fetchFavorits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);
  return (
    <div className="bg-gray-100">
      <LoginedLayout>
        <div className="mt-5 space-y-8">
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
            <p className="py-1 m-auto w-11/12 text-center bg-gray-200 rounded-lg">{profile?.wedding_hall}</p>
          </div>
          <div>
            <label htmlFor="description" className="flex justify-start mb-5 ml-3 text-gray-400">
              comment
            </label>
            {profile?.description ? (
              <p className="py-1 m-auto w-11/12 text-center whitespace-pre-wrap break-words bg-gray-200 rounded-lg">
                {profile?.description}
              </p>
            ) : (
              <p className="py-1 m-auto w-11/12 h-10 text-center bg-gray-200 rounded-lg">{profile?.description}</p>
            )}
          </div>
        </div>
        <p className="mt-20">{profile?.name}さんのキロクで検索</p>

        <PersonalSearch userId={router.query.id as string} setPosts={setPosts} />
        {posts.length === 0 ? (
          <p className="mb-10">キロクがありません。</p>
        ) : (
          posts.map((post) => {
            return (
              <div key={post.id} className="mb-10 bg-gray-200">
                <div className="flex justify-between min-w-max bg-gray-300">
                  <a className="flex">
                    <div className="my-1 mx-2">
                      {profile?.avatar ? (
                        <Image src={profile.avatar} alt="avatar" height={45} width={45} className="rounded-full" />
                      ) : (
                        <div className="bg-gray-200 rounded-full sm:w-28 sm:h-28" />
                      )}
                    </div>
                    <div className="flex items-center mx-3 text-sm">{profile?.name}</div>
                  </a>
                  <div className="flex items-center space-x-4">
                    <LikeButton postId={post.id} likes={likes} setLikes={setLikes} />
                    <FavoriteButton postId={post.id} favorits={favorits} setFavorits={setFavorits} />
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
        )}
      </LoginedLayout>
    </div>
  );
};

export default Profile;
