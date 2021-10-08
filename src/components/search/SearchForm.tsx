import type { Dispatch, SetStateAction, VFC } from "react";
import { useCallback } from "react";
import { useState } from "react";
import type { Post } from "src/components/post/Posts";
import { supabase } from "src/libs/supabase";
import { IoIosSearch } from "react-icons/io";
import { MyRadioGroup } from "src/components/search/MyRadioGroup";

type SearchFormProps = {
  setPosts: Dispatch<SetStateAction<Post[]>>;
};

export const SearchForm: VFC<SearchFormProps> = (props) => {
  const [word, setWord] = useState("");
  const [selection, setSelection] = useState("posts");

  const handleSearch = useCallback(async () => {
    if (word === "") return;
    //キロクのとき
    try {
      const res = await supabase
        .from(selection)
        // .select("text,id")
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
      props.setPosts(res.data);
    } catch (error) {
      console.error("error", error);
    }
  }, [props, selection, word]);

  return (
    <div className="mt-10">
      <MyRadioGroup selection={selection} setSelection={setSelection} />

      <div className="flex justify-center mt-10 mb-20">
        <input
          className="px-2 w-1/2 bg-gray-300 rounded-lg"
          onChange={(e) => {
            setWord(e.target.value);
          }}
          value={word}
        />
        <button>
          <IoIosSearch size={23} color={"#5A5A5A"} onClick={handleSearch} />
        </button>
      </div>
    </div>
  );
};
