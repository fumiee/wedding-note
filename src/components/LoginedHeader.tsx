import Image from "next/image";
import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";

import logo from "/public/logo.svg";

export const LoginedHeader: React.VFC = () => {
  return (
    <div className="flex justify-between py-1 px-2 pt-3">
      <IoIosSearch size={30} color={"#5A5A5A"} className="mt-1" />
      <Link href="/" passHref>
        <a>
          <Image src={logo} alt="logo" height={40} width={203} />
        </a>
      </Link>

      <Link href="/myPage" passHref>
        <a>
          <AiOutlineUser size={30} color={"#5A5A5A"} className="mt-1" />
        </a>
      </Link>
    </div>
  );
};