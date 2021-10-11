import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "src/libs/supabase";
import { LoginedLayout } from "src/components/layout/LoginedLayout";
import type { definitions } from "src/types/supabase";
import type { Post } from "src/components/post/Posts";
import type { PostgrestResponse } from "@supabase/postgrest-js";
import Image from "next/image";
import { PersonalSearch } from "src/components/PersonalSearch";

const Profile = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<definitions["profiles"]>();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchProfiles();
    fetchposts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const fetchProfiles = async () => {
    if (!router.query.profile) return;
    try {
      const res = await supabase
        .from<definitions["profiles"]>("profiles")
        .select("name,avatar,wedding_hall,description")
        .eq("user_id", router.query.profile as string)
        .single();
      if (res.error) throw res.error;
      setProfile(res.data);
    } catch (error) {
      console.error("error", error);
    }
  };

  const fetchposts = async () => {
    try {
      const res: PostgrestResponse<Post> = await supabase
        .from("posts")
        .select("text,id")
        .order("created_at", { ascending: false })
        .eq("user_id", router.query.profile);
      if (res.error) throw res.error;
      setPosts(res.data);
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <LoginedLayout>
      <div className="m-auto space-y-8">
        <div className="flex justify-around">
          <div>
            {profile?.avatar ? (
              <Image src={profile.avatar} alt="avatar" height={120} width={120} className="rounded-full" />
            ) : (
              <div className="bg-gray-200 rounded-full sm:w-28 sm:h-28 md:w-40 md:h-40" />
            )}
          </div>
          <div className="mt-5">
            <label htmlFor="name" className="flex justify-start mb-5 ml-3 w-36 text-gray-400">
              name
            </label>
            <p className=" w-full text-center border-b-2">{profile?.name}</p>
          </div>
        </div>
        <div>
          <label htmlFor="wedding_hall" className="flex justify-start mb-5 ml-3 text-gray-400">
            wedding hall
          </label>
          <p className="text-center border-b-2">{profile?.wedding_hall}</p>
        </div>
        <div>
          <label htmlFor="description" className="flex justify-start mb-5 ml-3 text-gray-400">
            comment
          </label>
          <p className="text-center whitespace-pre-wrap break-words border-b-2">{profile?.description}</p>
        </div>
      </div>
      <p className="mt-28">{profile?.name}さんのキロクで検索</p>

      <PersonalSearch userId={router.query.profile as string} setPosts={setPosts} />
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
                <div className="flex items-center">{/* <Like /> */}</div>
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
  );
};

export default Profile;
