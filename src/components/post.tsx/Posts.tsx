import { useEffect, useState } from "react";
import { supabase } from "src/libs/supabase";
import type { definitions } from "src/types/supabase";
import { AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";
import type { PostgrestResponse } from "@supabase/postgrest-js";
import Image from "next/image";

type Post = {
  createdAt: definitions["posts"]["created_at"];
  text: definitions["posts"]["text"];
  id: definitions["posts"]["id"];
  user: { name: definitions["profiles"]["name"]; avatar: definitions["profiles"]["avatar"] };
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
          avatar
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
      {/* <p>new post</p> */}
      <div>
        {posts?.map((post) => {
          return (
            <div key={post.id} className="mb-7 bg-gray-200">
              <div className=" flex min-w-max bg-gray-300">
                <div className="flex flex-col m-2">
                  {post.user.avatar ? (
                    <Image src={post.user.avatar} alt="avatar" height={40} width={40} className="rounded-full" />
                  ) : (
                    <div className="bg-gray-200 rounded-full sm:w-28 sm:h-28" />
                  )}
                </div>
                <div className="flex items-center ml-3 text-sm">{post.user.name}</div>
              </div>
              <div>
                <div className="flex">{post.text}</div>
              </div>
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
