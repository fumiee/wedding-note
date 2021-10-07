import { useEffect, useState } from "react";
import { supabase } from "src/libs/supabase";
import type { definitions } from "src/types/supabase";
import { AiOutlinePlus } from "react-icons/ai";
import type { PostgrestResponse } from "@supabase/postgrest-js";
import Link from "next/link";
import Image from "next/image";
// import { Like } from "src/components/Like";

export type Post = {
  createdAt: definitions["posts"]["created_at"];
  text: definitions["posts"]["text"];
  id: definitions["posts"]["id"];
  user: {
    name: definitions["profiles"]["name"];
    avatar: definitions["profiles"]["avatar"];
    user_id: definitions["profiles"]["user_id"];
  };
};

export const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchposts();
  }, []);

  const fetchposts = async () => {
    try {
      const res: PostgrestResponse<Post> = await supabase
        .from("posts")
        .select(
          `
        createdAt:created_at,
        text,
        id,
        user:posts_user_id_fkey(
          name,
          avatar,
          user_id
        )
        `
        )
        .order("created_at", { ascending: false })
        .range(0, 5);
      if (res.error) throw res.error;
      setPosts(res.data);
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-300">
      <div>
        {posts?.map((post) => {
          return (
            <div key={post.id} className="mb-10 bg-gray-200">
              <div className=" flex min-w-max bg-gray-300">
                <Link href={`/${post.user.user_id}`}>
                  <a className="flex">
                    <div className="my-1 mx-2">
                      {post.user.avatar ? (
                        <Image src={post.user.avatar} alt="avatar" height={45} width={45} className="rounded-full" />
                      ) : (
                        <div className="bg-gray-200 rounded-full sm:w-28 sm:h-28" />
                      )}
                    </div>
                    <div className="flex items-center mx-3 text-sm">{post.user.name}</div>
                  </a>
                </Link>
                <div className="flex items-center">{/* <Like /> */}</div>
              </div>
              <details className="block">
                <summary className="list-none">
                  <div className="px-2 text-left">{post.text.substr(0, 67)}</div>
                </summary>
                {post.text.length > 67 ? (
                  <div className="px-2 pb-1 text-left">{post.text.substr(68, 100000)}</div>
                ) : null}
              </details>
            </div>
          );
        })}
      </div>
      <div className="flex sticky bottom-2 justify-end mr-2">
        <Link href="/compose">
          <a className="bg-transparent">
            <AiOutlinePlus size={50} color={"#fff"} className="bg-gray-600 rounded-full" />
          </a>
        </Link>
      </div>
    </div>
  );
};
