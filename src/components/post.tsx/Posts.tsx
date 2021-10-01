import { useEffect, useState } from "react";
import { TextEditor } from "src/components/post.tsx/TextEditor";
import { supabase } from "src/libs/supabase";
import type { definitions } from "src/types/supabase";

type PostList = Pick<definitions["posts"], "user_id" | "created_at" | "text" | "id">;

export const Posts = () => {
  const [posts, setPosts] = useState<PostList[]>([]);
  // const user = supabase.auth.user();

  useEffect(() => {
    fetchposts();
  }, []);
  const fetchposts = async () => {
    try {
      const res = await supabase
        .from<definitions["posts"]>("posts")
        .select("*")
        .order("created_at", { ascending: false })
        .range(0, 8);
      // .eq("user_id", user.id)
      // .single();
      if (res.error) throw res.error;
      setPosts(res.data);
    } catch (error) {
      console.error("error", error);
    }
  };
  // if (!user) return;
  return (
    <div className=" min-h-screen bg-gray-100">
      <p>new post</p>
      <div>
        {posts?.map((post) => {
          return (
            <div key={post.id} className="m-8 max-w-3xl bg-gray-200 rounded-lg">
              <div>{post.user_id}</div>
              <div>{post.text}</div>
            </div>
          );
        })}
      </div>
      {/* <div className="sticky bottom-0"> */}
      <TextEditor />
      {/* </div> */}
    </div>
  );
};
