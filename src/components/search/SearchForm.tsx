import type { VFC } from "react";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";

type SearchFormProps = {
  how: string;
  handleSearch: (word: string) => Promise<void>;
};

export const SearchForm: VFC<SearchFormProps> = (props) => {
  const [word, setWord] = useState("");

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
          <IoIosSearch
            size={23}
            color={"#5A5A5A"}
            onClick={() => {
              return props.handleSearch(word);
            }}
          />
        </button>
      </div>
    </div>
  );
};
