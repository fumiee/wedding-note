import { useState, useEffect, useCallback } from "react";
import { supabase } from "src/libs/supabase";
import type { definitions } from "src/types/supabase";
import Image from "next/image";

type Profile = Pick<definitions["profiles"], "name" | "avatar">;
type Update = Pick<definitions["profiles"], "name" | "avatar" | "wedding_hall" | "description" | "updated_at">;

export const User: React.VFC<Profile> = () => {
  const [profile, setProfile] = useState<Profile>();

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    const user = supabase.auth.user();
    if (!user) return;
    try {
      const res = await supabase
        .from<definitions["profiles"]>("profiles")
        .select("name,avatar")
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

  const updateProfile = ({ name, avatar, wedding_hall, description }: Update) => {
    try {
      // const user = supabase.auth.user();
      const updates = {
        name,
        avatar,
        wedding_hall,
        description,
        update_at: new Date(),
      };
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div className="m-auto space-y-8 max-w-90">
      <div className="flex justify-around">
        <div>
          {profile?.avatar ? (
            <Image src={profile.avatar} alt="avatar" height={100} width={100} className="rounded-full" />
          ) : (
            <div className="w-28 h-28 bg-gray-200 rounded-full" />
          )}
        </div>
        <div>
          <div className="flex justify-around mb-5">
            <button className="px-2 text-gray-400 border-2" onClick={updateProfile}>
              Up date
            </button>
            <button className=" px-2 text-gray-400 border-2" onClick={signOut}>
              Sign Out
            </button>
          </div>
          <p></p>
          <label htmlFor="name" className="flex justify-start mb-5">
            name
          </label>
          <p />
          <input type="text" id="name" defaultValue={profile?.name} className="w-full text-center border-b-2" />
        </div>
      </div>
      <div>
        <label htmlFor="name" className="flex justify-start">
          wedding hall
        </label>
        <p />
        <input type="text" id="hall" className="m-auto w-full border-b-2" />
      </div>
      <div>
        <label htmlFor="comment" className="flex justify-start">
          comment
        </label>
        <p />
        <input type="text" id="comment" className="w-full border-b-2" />
      </div>
    </div>
  );
};
