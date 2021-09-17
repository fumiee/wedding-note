import Image from "next/image";
import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";

import logo from "/public/logo.svg";

export const Header: React.VFC = () => {
  return (
    <div className="flex justify-between p-4">
      <IoIosSearch size={30} color={"#5A5A5A"} className="mt-1" />
      <Link href="/top" passHref>
        <Image src={logo} alt="logo" height={40} width={203} />
      </Link>
      <Link href="/" passHref>
        <AiOutlineUser size={30} color={"#5A5A5A"} className="mt-1" />
      </Link>
    </div>
  );
};
