import type { Dispatch, SetStateAction, VFC } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { supabase } from "src/libs/supabase";
import type { Post } from "src/pages/search/postSearch";

type PersonalSearchProps = {
  userId: string;
  setPosts: Dispatch<SetStateAction<Post[]>>;
};

export const PersonalSearch: VFC<PersonalSearchProps> = (props) => {
  const [text, setText] = useState("");

  const handleSearch = useCallback(async () => {
    if (text === "") return;
    try {
      const res = await supabase
        .from("posts")
        .select("text,id")
        .order("created_at", { ascending: false })
        .eq("user_id", props.userId)
        .like("text", `%${text}%`);
      if (res.error) throw res.error;
      props.setPosts(res.data);
    } catch (error) {
      console.error("error", error);
    }
  }, [props, text]);

  return (
    <div className="flex justify-center mt-10 mb-20">
      <input
        className="px-2 w-1/2 text-white bg-gray-400 rounded-lg"
        onChange={(e) => {
          setText(e.target.value);
        }}
        value={text}
      />
      <button>
        <IoIosSearch size={23} color={"#5A5A5A"} onClick={handleSearch} />
      </button>
    </div>
  );
};
