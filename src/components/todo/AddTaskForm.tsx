import type { Dispatch, SetStateAction, VFC } from "react";
import { useCallback, useState } from "react";
import { supabase } from "src/libs/supabase";
import { IoAddOutline } from "react-icons/io5";
import type { List } from "./Todo";

type AddTaskFormProps = {
  setErrorText: Dispatch<SetStateAction<string>>;
  setLists: Dispatch<SetStateAction<List[]>>;
  lists: List[];
};

export const AddTaskForm: VFC<AddTaskFormProps> = (props) => {
  const [newTaskText, setNewTaskText] = useState("");

  const handleAddTodo = async () => {
    const user = supabase.auth.user();
    const task = newTaskText.trim();
    if (task.length && user?.id) {
      const { data: todos, error } = await supabase.from("todos").insert({ todo: task, user_id: user.id }).single();
      if (error) {
        props.setErrorText(error.message);
        return;
      }
      props.setLists([...props.lists, { todo: task, id: todos.id }]);
      setNewTaskText("");
    }
  };
  const handleInputTask = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskText(e.target.value);
  }, []);
  return (
    <div className="flex justify-center">
      <p />
      <input type="text" className="w-2/3 bg-gray-200 rounded-l-md" value={newTaskText} onChange={handleInputTask} />
      <button className="bg-gray-200 rounded-r-md" onClick={handleAddTodo}>
        <IoAddOutline size={24} color={"#5A5A5A"} />
      </button>
    </div>
  );
};
