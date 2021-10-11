/* eslint-disable react/display-name */
import Image from "next/image";
import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import { Menu } from "@headlessui/react";

import logo from "/public/logo.svg";

export const Header: React.VFC = () => {
  return (
    <div className="flex z-50 justify-between py-1 pt-3 bg-white bg-opacity-50">
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
                  <a className={`${active && "bg-gray-500 text-white rounded-lg w-20 m-auto"}`} href="/postSearch">
                    キロク
                  </a>
                );
              }}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => {
                return (
                  <a className={`${active && "bg-gray-500 text-white rounded-lg w-20 m-auto"}`} href="/nameSearch">
                    ナマエ
                  </a>
                );
              }}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => {
                return (
                  <a className={`${active && "bg-gray-500 text-white rounded-lg w-20 m-auto"}`} href="/whSearch">
                    結婚式場
                  </a>
                );
              }}
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
      <Link href="/top" passHref>
        <a>
          <Image src={logo} alt="logo" height={40} width={203} />
        </a>
      </Link>
      <Link href="/" passHref>
        <a>
          <AiOutlineUser size={30} color={"#5A5A5A"} className="mt-1 mr-2" />
        </a>
      </Link>
    </div>
  );
};
