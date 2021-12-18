import Image from "next/image";
import toast from "react-hot-toast";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "src/libs/supabase";
import { PersonalSearch } from "src/components/mypage/PersonalSearch";
import { useFetchProfiles } from "src/hooks/useFetchProfiles";
import { useFetchUserPosts } from "src/hooks/useFetchUserPosts";
import { useFetchLikeFav } from "src/hooks/useFetchLikeFav";
import { PostDisplay } from "src/components/display/PostDisplay";

export const User = () => {
  const { profile, fetchProfiles } = useFetchProfiles();
  const { posts, setPosts, fetchPosts } = useFetchUserPosts();
  const { likes, setLikes, userId, favoritePostsArray, setFavoritePostsArray } = useFetchLikeFav();
  const [username, setUsername] = useState(profile?.name);
  const [avatar_url] = useState(profile?.avatar);
  const [weddingHall, setWeddingHall] = useState(profile?.wedding_hall);
  const [description, setDescription] = useState(profile?.description);

  useEffect(() => {
    if (!userId) return;
    fetchPosts(userId);
    fetchProfiles(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signOut = useCallback(() => {
    supabase.auth.signOut();
  }, []);

  const updateProfile = async () => {
    try {
      const user = supabase.auth.user();
      const updates = {
        user_id: user?.id,
        name: username,
        avatar: avatar_url,
        wedding_hall: weddingHall,
        description: description,
        updated_at: new Date(),
      };
      const { error } = await supabase.from("profiles").upsert(updates, {
        returning: "minimal",
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("error", error);
    }
  };
  const HandleUpdateProfile = () => {
    toast.promise(updateProfile(), {
      loading: "更新中",
      success: "更新しました",
      error: "更新に失敗しました",
    });
  };

  return (
    <div className="mt-5 space-y-8 bg-gray-100">
      <div className="flex justify-around">
        <div>
          {profile?.avatar ? (
            <Image src={profile.avatar} alt="avatar" height={120} width={120} className="rounded-full" />
          ) : (
            <div className="bg-gray-200 rounded-full sm:w-28 sm:h-28 md:w-40 md:h-40" />
          )}
        </div>
        <div>
          <div className="flex justify-around mb-5">
            <button className=" px-2 text-gray-400 rounded-lg border-2 border-gray-300" onClick={signOut}>
              Sign Out
            </button>
            <button
              className="px-2 text-gray-500 bg-gray-200 rounded-lg border-2 border-gray-300"
              onClick={HandleUpdateProfile}
            >
              Update
            </button>
          </div>
          <p></p>
          <label htmlFor="name" className="flex justify-start mb-5 ml-3 text-gray-400">
            name
          </label>
          <p />
          <input
            type="text"
            id="name"
            defaultValue={profile?.name}
            className="py-1 m-auto w-11/12 text-center bg-gray-200 rounded-lg"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
      </div>
      <div>
        <label htmlFor="wedding_hall" className="flex justify-start mb-5 ml-3 text-gray-400">
          wedding hall
        </label>
        <p />
        <input
          type="text"
          id="wedding_hall"
          defaultValue={profile?.wedding_hall}
          className="py-1 m-auto w-11/12 text-center bg-gray-200 rounded-lg"
          onChange={(e) => {
            setWeddingHall(e.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="description" className="flex justify-start mb-5 ml-3 text-gray-400">
          comment
        </label>
        <p />
        <textarea
          id="description"
          defaultValue={profile?.description}
          className="py-1 m-auto w-11/12 text-center bg-gray-200 rounded-lg"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <p className="mt-20">キロクを探す</p>
        <PersonalSearch userId={userId as string} setPosts={setPosts} />
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
    </div>
  );
};
