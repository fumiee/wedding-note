import type { VFC } from "react";
import { useState } from "react";
import { IoSquareOutline } from "react-icons/io5";
import { IoCheckboxOutline } from "react-icons/io5";
import { supabase } from "src/libs/supabase";

type Props = {
  listId: number;
  isDone: boolean;
};

export const HandleDone: VFC<Props> = (props) => {
  const [isDone, setIsDoe] = useState<boolean>(props.isDone);

  const handleClick = () => {
    setIsDoe((isDone) => {
      return !isDone;
    });
    updateIsDone();
  };

  const updateIsDone = async () => {
    try {
      const updates = {
        is_done: !isDone,
        updated_at: new Date(),
      };
      const { error } = await supabase
        .from("todos")
        .update(updates, {
          returning: "minimal",
        })
        .eq("id", props.listId);
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <button onClick={handleClick}>
      {isDone ? (
        <IoCheckboxOutline size={20} color={"#5A5A5A"} className="mr-2" />
      ) : (
        <IoSquareOutline size={20} color={"#5A5A5A"} className="mr-2" />
      )}
    </button>
  );
};
