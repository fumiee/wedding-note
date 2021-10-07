import type { Dispatch, SetStateAction, VFC } from "react";
import { supabase } from "src/libs/supabase";
import { useRouter } from "next/router";

type HandlePostProps = {
  postText: string;
  setPostText: Dispatch<SetStateAction<string>>;
};

export const HandlePost: VFC<HandlePostProps> = (props) => {
  const router = useRouter();
  const handleClick = async () => {
    try {
      const user = supabase.auth.user();
      const updates = {
        user_id: user?.id,
        text: props.postText,
        created_at: new Date(),
      };
      const { error } = await supabase.from("posts").upsert(updates, {
        returning: "minimal",
      });
      props.setPostText("");
      router.push("/");
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("error", error);
    }
  };
  return (
    <div className="flex items-center mt-5">
      <button onClick={handleClick}>
        <a className="block m-auto w-32 h-6 text-white bg-gray-500 rounded-lg">投稿</a>
      </button>
    </div>
  );
};
