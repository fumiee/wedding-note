// import ReactDOM from "react-dom";
import { useState } from "react";
import { HandlePost } from "src/components/home/post/HandlePost";
import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";

export const TextEditor = () => {
  const [postText, setPostText] = useState<string>("");

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-between px-5 mx-4">
        <Link href="/">
          <a>
            <IoMdArrowBack size={35} color={"#5A5A5A"} className="my-3" />
          </a>
        </Link>
        <HandlePost postText={postText} setPostText={setPostText} />
      </div>
      <div className="whitespace-pre-wrap">
        <textarea
          className="p-5 m-auto w-11/12 min-h-screen rounded-lg"
          value={postText}
          onChange={(e) => {
            setPostText(e.target.value);
          }}
        ></textarea>
      </div>
    </div>
  );
};
