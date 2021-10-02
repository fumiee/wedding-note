import { useState, useEffect, useCallback } from "react";
import { supabase } from "src/libs/supabase";
import type { definitions } from "src/types/supabase";
import Image from "next/image";
import toast from "react-hot-toast";

// type Profile = Pick<definitions["profiles"], "name" | "avatar">;
// type Profile = definitions["profiles"]

export const User: React.VFC<definitions["profiles"]> = () => {
  const [profile, setProfile] = useState<definitions["profiles"]>();
  const [username, setUsername] = useState(profile?.name);
  const [avatar_url, setAvatarUrl] = useState(profile?.avatar);
  const [weddingHall, setWeddingHall] = useState(profile?.wedding_hall);
  const [description, setDescription] = useState(profile?.description);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    const user = supabase.auth.user();
    if (!user) return;
    try {
      const res = await supabase
        .from<definitions["profiles"]>("profiles")
        .select("name,avatar,wedding_hall,description")
        .eq("user_id", user.id)
        .single();
      if (res.error) throw res.error;
      setProfile(res.data);
    } catch (error) {
      console.error("error", error);
    }
  };

  const signOut = useCallback(() => {
    supabase.auth.signOut();
    setProfile(undefined);
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
      </div>
    </div>
  );
};
