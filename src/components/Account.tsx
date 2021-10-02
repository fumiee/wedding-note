import { Tab } from "@headlessui/react";
import { Todo } from "./todo/Todo";
import { Footer } from "./Footer";
import { LoginedHeader } from "./LoginedHeader";
import { IoHomeOutline } from "react-icons/io5";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoCheckboxOutline } from "react-icons/io5";
import { Posts } from "src/components/post.tsx/Posts";

export const Account: React.VFC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <LoginedHeader />
      <div className="flex-1">
        <Tab.Group>
          <Tab.List>
            <div className="flex justify-around">
              <Tab className=" w-2/6 h-8 bg-gray-300">
                <IoHomeOutline size={25} color={"#5A5A5A"} className="m-auto" />
              </Tab>
              <Tab className=" w-2/6 h-8 bg-gray-200">
                {" "}
                <IoBookmarkOutline size={25} color={"#5A5A5A"} className="m-auto" />
              </Tab>
              <Tab className=" w-2/6 h-8 bg-gray-100">
                {" "}
                <IoCheckboxOutline size={25} color={"#5A5A5A"} className="m-auto" />
              </Tab>
            </div>
            <Tab.Panels>
              <Tab.Panel>
                <Posts />
              </Tab.Panel>

              <Tab.Panel>お気に入り</Tab.Panel>

              <Tab.Panel>
                <Todo />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.List>
        </Tab.Group>
      </div>
      <Footer />
    </div>
  );
};
