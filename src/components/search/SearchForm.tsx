import { useCallback, useState } from "react";
import type { Post } from "src/components/post/Posts";
import { supabase } from "src/libs/supabase";
import { IoIosSearch } from "react-icons/io";
import { MyRadioGroup } from "src/components/search/MyRadioGroup";
import Image from "next/image";
import Link from "next/link";
import type { definitions } from "src/types/supabase";

type User = Pick<definitions["profiles"], "name" | "user_id" | "avatar" | "wedding_hall">;

export const SearchForm = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [word, setWord] = useState("");
  const [selection, setSelection] = useState("posts");
  //キロクのとき
  const searchPosts = useCallback(async () => {
    try {
      const res = await supabase
        .from(selection)
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
        .like("text", `%${word}%`)
        .order("created_at", { ascending: false });
      if (res.error) throw res.error;
      setPosts(res.data);
      setUsers([]);
    } catch (error) {
      console.error("error", error);
    }
  }, [selection, word]);

  //名前、結婚式場のとき
  const searchNameWh = useCallback(async () => {
    try {
      const res = await supabase
        .from("profiles")
        .select("name,avatar,user_id,wedding_hall")
        .like(selection === "profiles" ? "name" : "wedding_hall", `%${word}%`);
      if (res.error) throw res.error;
      setUsers(res.data);
      setPosts([]);
    } catch (error) {
      console.error("error", error);
    }
  }, [selection, word]);

  const handleSearch = useCallback(() => {
    if (!word) return;
    selection === "posts" ? searchPosts() : searchNameWh();
  }, [searchNameWh, searchPosts, selection, word]);

  return (
    <div className="mt-10">
      <MyRadioGroup selection={selection} setSelection={setSelection} />
      <div className="flex justify-center mt-10 mb-20">
        <input
          className="px-2 w-1/2 text-white bg-gray-400 rounded-lg"
          onChange={(e) => {
            setWord(e.target.value);
          }}
          value={word}
        />
        <button className="">
          <IoIosSearch size={23} color={"#5A5A5A"} onClick={handleSearch} />
        </button>
      </div>
      {selection === "posts" ? (
        posts.length !== 0 ? (
          posts.map((post) => {
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
          })
        ) : (
          <p className="mb-10 text-gray-400">not found</p>
        )
      ) : //selectionがpostsでない↓
      users.length !== 0 ? (
        users.map((user) => {
          return <div key={user.user_id}>{user.name}</div>;
        })
      ) : (
        <p className="mb-10 text-gray-400">not found</p>
      )}
    </div>
  );
};
