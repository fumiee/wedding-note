import Image from "next/image";
import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import { SearchDrop } from "src/components/search/SearchDrop";
import logo from "/public/logo.svg";

export const Header: React.VFC = () => {
  return (
    <div className="flex z-50 justify-between py-1 pt-3 bg-white bg-opacity-50">
      <SearchDrop />
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
