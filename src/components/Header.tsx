import { IoIosSearch } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import Image from "next/image";
import logo from "/public/logo.svg";

export const Header: React.VFC = () => {
  return (
    <div className="flex justify-between p-4">
      <IoIosSearch size={30} color={"#5A5A5A"} className="mt-1" />
      <Image src={logo} alt="logo" height={40} width={203} />
      <AiOutlineUser size={30} color={"#5A5A5A"} className="mt-1" />
    </div>
  );
};
