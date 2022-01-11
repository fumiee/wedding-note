import type { VFC } from "react";
import Link from "next/link";

type ITEM = {
  label: string;
  link: string;
};

const ITEM = [{ label: "退会する", link: "/withdrawal" }];

export const Footer: VFC = () => {
  return (
    <div className="p-10 text-xs text-gray-100 bg-gray-500">
      {ITEM.map((item) => {
        return (
          <Link href={item.link} key={item.label}>
            <a>{item.label}</a>
          </Link>
        );
      })}
      <footer>
        <div className="mt-5">©2021 yorimaru</div>
      </footer>
    </div>
  );
};
