import { useState, useEffect } from "react";
import { supabase } from "src/libs/supabase";
import type { definitions } from "src/types/supabase";
import Image from "next/image";

type Profile = Pick<definitions["profiles"], "name" | "avatar">;

export const MyPage: React.VFC<Profile> = () => {
  const [profile, setProfile] = useState<Profile>();

  // useEffect(() => {
  //   // setSession(supabase.auth.session());
  //   supabase.auth.onAuthStateChange((_event, session) => {
  //     session;
  //   });
  // }, []);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    const user = supabase.auth.user();
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from<definitions["profiles"]>("profiles")
        .select("name,avatar")
        .eq("user_id", user.id)
        .single();
      if (!data) throw new Error("ユーザーデータがありません"); //オプショナルインスタンス クラスのインスタンス化
      setProfile(data); //userがあるならdataは絶対あるのに？！は、そうしかない状態を作る。
      // console.log(error);
      if (error) throw error; //下のerrorはとってきたerror？ちがう。これ
    } catch (error) {
      console.log("error", error);
    }
  };

  // const updateProfile=({name,avatar,wedding_holl,description})=>{
  //     try{
  //         const user = supabase.auth.user()
  //         const updates = {
  //         name,
  //         avatar,
  //         wedding_holl,
  //         description,
  //         update_at:new Date(),
  //         }
  //     }
  // }

  return (
    <div>
      <div className="flex justify-center">
        <div>
          {profile?.avatar ? (
            <Image src={profile.avatar} alt="avatar" style={{ height: 100, width: 100 }} className="m-5 rounded-full" />
          ) : (
            <div className="w-28 h-28 bg-gray-200 rounded-full" />
          )}
        </div>
        <div>
          <button
            className=" mb-6 w-36 text-gray-400 border-2"
            onClick={() => {
              return supabase.auth.signOut();
            }}
          >
            Sign Out
          </button>
          <p></p>
          <label htmlFor="name">name</label>
          <input type="text" id="name" defaultValue={profile?.name} className="text-center border-b-2" />
        </div>
      </div>
    </div>
  );
};
