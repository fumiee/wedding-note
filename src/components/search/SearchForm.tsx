import type { VFC } from "react";
import { useCallback, useState } from "react";
import { supabase } from "src/libs/supabase";
import { IoIosSearch } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import type { definitions } from "src/types/supabase";
import { useRouter } from "next/router";

type Post = {
  createdAt: definitions["posts"]["created_at"];
  text: definitions["posts"]["text"];
  id: definitions["posts"]["id"];
  user: {
    name: definitions["profiles"]["name"];
    avatar: definitions["profiles"]["avatar"];
    user_id: definitions["profiles"]["user_id"];
  };
  name: definitions["profiles"]["name"];
  avatar: definitions["profiles"]["avatar"];
  user_id: definitions["profiles"]["user_id"];
  wedding_hall: definitions["profiles"]["wedding_hall"];
};
type SearchForm = {
  how: string;
};

export const SearchForm: VFC<SearchForm> = (props) => {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  // const [users, setUsers] = useState<User[]>([]);
  const [word, setWord] = useState("");
  // const [selection, setSelection] = useState("posts");

  //キロクのとき
  const searchPosts = useCallback(async () => {
    try {
      const res = await supabase
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
        .like("text", `%${word}%`)
        .order("created_at", { ascending: false });
      if (res.error) throw res.error;
      setPosts(res.data);
    } catch (error) {
      console.error("error", error);
    }
  }, [word]);

  //名前のとき
  const searchName = useCallback(async () => {
    try {
      const res = await supabase.from("profiles").select("name,avatar,user_id,wedding_hall").like("name", `%${word}%`);
      if (res.error) throw res.error;
      setPosts(res.data);
      // setPosts([]);
    } catch (error) {
      console.error("error", error);
    }
  }, [word]);

  //結婚式場のとき
  const searchWh = useCallback(async () => {
    try {
      const res = await supabase
        .from("profiles")
        .select("name,avatar,user_id,wedding_hall")
        .like("wedding_hall", `%${word}%`);
      if (res.error) throw res.error;
      setPosts(res.data);
      // setPosts([]);
    } catch (error) {
      console.error("error", error);
    }
  }, [word]);

  const handleSearch = useCallback(() => {
    if (!word) return;
    router.pathname === "/postSearch" ? searchPosts() : router.pathname === "/nameSearch" ? searchName() : searchWh();
  }, [router.pathname, searchName, searchPosts, searchWh, word]);

  return (
    <div className="mt-10">
      <p className="text-sm tracking-widest text-gray-400">{props.how}でさがす</p>
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
      {posts.length !== 0 ? (
        router.pathname === "/postSearch" ? (
          posts.map((post) => {
            return (
              <div key={post.id} className="mb-10 bg-gray-200">
                <div className=" flex min-w-max bg-gray-300">
                  <Link href={`/${post.user.user_id}`}>
                    <a className="flex my-1 mx-2">
                      {post.user.avatar ? (
                        <Image src={post.user.avatar} alt="avatar" height={45} width={45} className="rounded-full" />
                      ) : (
                        <div className="bg-gray-200 rounded-full sm:w-28 sm:h-28" />
                      )}
                      <div className="flex items-center mx-3 text-sm">{post.user.name}</div>
                    </a>
                  </Link>
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
        ) : (
          posts.map((post) => {
            return (
              <div key={post.user_id} className="mb-10 bg-gray-200">
                <div className=" flex min-w-max bg-gray-300">
                  <Link href={`/${post.user_id}`}>
                    <a className="flex my-1 mx-2">
                      {post.avatar ? (
                        <Image src={post.avatar} alt="avatar" height={45} width={45} className="rounded-full" />
                      ) : (
                        <div className="bg-gray-200 rounded-full sm:w-28 sm:h-28" />
                      )}
                      <div className="flex items-center mx-3 text-sm">{post.name}</div>
                    </a>
                  </Link>
                </div>
              </div>
            );
          })
        )
      ) : (
        <p className="mb-10 text-gray-400">not found</p>
      )}
    </div>
  );
};
