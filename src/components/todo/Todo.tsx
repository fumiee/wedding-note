import { useCallback, useEffect, useState } from "react";
import { supabase } from "src/libs/supabase";
import type { definitions } from "types/supabase";
import { BsPencil } from "react-icons/bs";
import { AddTaskForm } from "src/components/todo/AddTaskForm";
import { HandleDone } from "src/components/todo/HandleDone";

export type List = Pick<definitions["todos"], "id" | "group_id" | "todo" | "is_done">;

export const Todo: React.VFC = () => {
  const [lists, setLists] = useState<List[]>([]);
  const [isShow, setIsShow] = useState(false);
  const [errorText, setErrorText] = useState("");

  const fetchTodos = useCallback(async () => {
    try {
      const user = supabase.auth.user();
      if (!user) return;

      const { data, error } = await supabase
        .from<definitions["todos"]>("todos")
        .select("id,group_id,todo,is_done")
        .eq("user_id", user.id);
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

  const handleDelete = useCallback(
    async (id: number) => {
      try {
        await supabase.from("todos").delete().eq("id", id);
        const filter = lists.filter((list) => {
          return list.id !== id;
        });

        setLists(filter);
      } catch (error) {
        console.error("error", error);
      }
    },
    [lists]
  );

  const reversedLists = [...lists].reverse();

  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-xl">todolist</h1>
      <p>{errorText}</p>

      <button
        onClick={() => {
          setIsShow((isShow) => {
            return !isShow;
          });
        }}
        className="m-5"
      >
        <BsPencil size={25} color={"#5A5A5A"} />
      </button>
      {isShow ? <AddTaskForm setErrorText={setErrorText} setLists={setLists} lists={lists} /> : null}

      <div className=" m-auto w-3/4">
        {reversedLists.map((list) => {
          return (
            <div key={list.id} className=" flex justify-between m-4">
              <div className="flex">
                <HandleDone listId={list.id} isDone={list.is_done as boolean} />
                {list.todo}
              </div>
              <button
                onClick={() => {
                  return handleDelete(list.id);
                }}
              >
                ×
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
