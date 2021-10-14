import { useState, useEffect, useCallback } from "react";
import { supabase } from "src/libs/supabase";
import type { definitions } from "src/types/supabase";
import { PersonalSearch } from "src/components/PersonalSearch";
import { useFetchProfiles } from "src/libs/useFetchProfiles";
import { useFetchPosts } from "src/libs/useFetchPosts";
import Image from "next/image";
import toast from "react-hot-toast";
import { FavoriteButton } from "src/components/post/FavoriteButton";
import { LikeButton } from "src/components/post/LikeButton";
import { useFetchLikes } from "src/libs/useFetchLikes";
import { useFetchFavorits } from "src/libs/useFetchFavorits";

export const User: React.VFC<definitions["profiles"]> = () => {
  const { profile, fetchProfiles } = useFetchProfiles();
  const { posts, setPosts, fetchPosts } = useFetchPosts();
  const [username, setUsername] = useState(profile?.name);
  const [avatar_url] = useState(profile?.avatar);
  const [weddingHall, setWeddingHall] = useState(profile?.wedding_hall);
  const [description, setDescription] = useState(profile?.description);
  const { likes, setLikes, fetchLikes } = useFetchLikes();
  const { favorits, setFavorits, fetchFavorits } = useFetchFavorits();

  const user = supabase.auth.user();

  useEffect(() => {
    if (!user) return;
    fetchProfiles(user.id);
    fetchPosts(user.id);
    fetchLikes();
    fetchFavorits();
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
    <div className="m-auto space-y-8">
      <div className="flex justify-around">
        <div>
          {profile?.avatar ? (
            <Image src={profile.avatar} alt="avatar" height={120} width={120} className="rounded-full" />
          ) : (
            <div className="bg-gray-200 rounded-full sm:w-28 sm:h-28 md:w-40 md:h-40" />
          )}
        </div>
        <div>
          <div className=" flex justify-around mb-5">
            <button className=" px-2 text-gray-400 border-2 border-gray-300" onClick={signOut}>
              Sign Out
            </button>
            <button className="px-2 text-gray-500 bg-gray-200 border-2 border-gray-300" onClick={HandleUpdateProfile}>
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
            className="w-full text-center border-b-2"
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
          className="m-auto w-full text-center border-b-2"
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
          className="w-full text-center border-b-2"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <p className="mt-28">キロクを探す</p>
        <PersonalSearch userId={user?.id as string} setPosts={setPosts} />
        {posts.length === 0 ? (
          <p className="mb-10">キロクがありません。</p>
        ) : (
          posts.map((post) => {
            return (
              <div key={post.id} className="mb-10 bg-gray-200">
                <div className=" flex min-w-max bg-gray-300">
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
                  <div className="flex items-center">
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
      </div>
    </div>
  );
};
