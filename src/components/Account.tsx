import type { VFC } from "react";
import { Tab } from "@headlessui/react";
import { Todo } from "src/components/home/todo/Todo";
import { IoBookmarkOutline, IoCheckboxOutline, IoHomeOutline } from "react-icons/io5";
import { PostList } from "src/components/home/post/PostList";
import { FavoriteList } from "src/components/home/favorite/FavoriteList";

export const Account: VFC = () => {
  return (
    <Tab.Group>
      {/* 以下 headless ui*/}
      <Tab.List>
        <div className="flex justify-around">
          <Tab className=" w-2/6 h-8 bg-gray-300">
            <IoHomeOutline size={25} color={"#5A5A5A"} className="m-auto" />
          </Tab>
          <Tab className=" w-2/6 h-8 bg-gray-200">
            <IoBookmarkOutline size={25} color={"#5A5A5A"} className="m-auto" />
          </Tab>
          <Tab className=" w-2/6 h-8 bg-gray-100">
            <IoCheckboxOutline size={25} color={"#5A5A5A"} className="m-auto" />
          </Tab>
        </div>
        <Tab.Panels>
          <Tab.Panel>
            <PostList />
          </Tab.Panel>

          <Tab.Panel>
            <FavoriteList />
          </Tab.Panel>

          <Tab.Panel>
            <Todo />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.List>
    </Tab.Group>
  );
};
