import type { Dispatch, SetStateAction, VFC } from "react";
import { useCallback } from "react";
import { supabase } from "src/libs/supabase";
import { RiDeleteBin6Line } from "react-icons/ri";

type HandlePostProps = {
  postText: string;
  setIsShow: Dispatch<SetStateAction<boolean>>;
  setPostText: Dispatch<SetStateAction<string>>;
};

export const HandlePost: VFC<HandlePostProps> = (props) => {
  const handledelete = useCallback(() => {
    props.setIsShow(false);
    props.setPostText("");
  }, [props]);

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
      props.setIsShow(false);
      props.setPostText("");
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("error", error);
    }
  };
  return (
    <div className="flex justify-center">
      <button className="m-auto w-2/3 h-8 bg-gray-300 rounded-lg" onClick={handleClick}>
        投稿
      </button>
      <button className="m-auto w-1/6 h-8 text-center bg-gray-500 rounded-lg" onClick={handledelete}>
        <RiDeleteBin6Line size={20} color={"#fff"} className="m-auto" />
      </button>
    </div>
  );
};
