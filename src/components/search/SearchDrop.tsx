import { IoIosSearch } from "react-icons/io";
import { Menu } from "@headlessui/react";
import Link from "next/link";

export const SearchDrop = () => {
  return (
    <div>
      <Menu>
        <Menu.Button>
          <IoIosSearch size={30} color={"#5A5A5A"} className="mt-1 ml-2" />
        </Menu.Button>

        <Menu.Items className="flex absolute flex-col justify-center mt-3 space-y-3 w-48 h-48 text-gray-400 bg-white rounded-full border-2 border-gray-400">
          <p className="text-sm tracking-widest text-gray-300">なにでさがす？</p>
          <Menu.Item>
            {({ active }) => {
              return (
                <Link href="/postSearch">
                  <a className={`${active && "bg-gray-500 text-white rounded-lg w-20 m-auto"}`}>キロク</a>
                </Link>
              );
            }}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => {
              return (
                <Link href="/nameSearch">
                  <a className={`${active && "bg-gray-500 text-white rounded-lg w-20 m-auto"}`}>ナマエ</a>
                </Link>
              );
            }}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => {
              return (
                <Link href="/whSearch">
                  <a className={`${active && "bg-gray-500 text-white rounded-lg w-20 m-auto"}`}>結婚式場</a>
                </Link>
              );
            }}
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
};
