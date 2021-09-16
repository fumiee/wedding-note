import { useCallback, useEffect, useState } from "react";
import { supabase } from "src/libs/supabase";
import type { definitions } from "src/types/supabase";

type List = Pick<definitions["todos"], "id" | "group_id" | "todo">;

export const Todo: React.VFC = () => {
  const [lists, setLists] = useState<List[]>([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [errorText, setErrorText] = useState("");

  const handleInputTask = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskText(e.target.value);
  }, []);

  const fetchTodos = useCallback(async () => {
    try {
      const user = supabase.auth.user();
      if (!user) return;

      const { data, error } = await supabase
        .from<definitions["todos"]>("todos")
        .select("id,group_id,todo")
        .eq("user_id", user.id)
        .eq("is_done", false);

      if (error) throw error;
      if (!data) throw new Error();

      setLists(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAddTodo = useCallback(async () => {
    const user = supabase.auth.user();
    const task = newTaskText.trim();
    if (task.length && user?.id) {
      const { data: todos, error } = await supabase.from("todos").insert({ todo: task, user_id: user.id }).single();
      if (error) {
        setErrorText(error.message);
        return;
      }
      setLists([...lists, { todo: task, id: todos.id }]);
      setNewTaskText("");
    }
  }, [lists, newTaskText]);

  return (
    <div>
      <h1>todolist</h1>
      <button>グループの追加</button>
      <div>group1</div>
      <input type="text" className="bg-gray-200" value={newTaskText} onChange={handleInputTask} />
      <p>{errorText}</p>
      <button className="border-2" onClick={handleAddTodo}>
        add
      </button>

      <div>
        {lists.map((list) => {
          return <div key={list.id}>{list.todo}</div>;
        })}
      </div>
    </div>
  );
};
