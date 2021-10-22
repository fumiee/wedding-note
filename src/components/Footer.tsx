import Link from "next/link";

type ITEM = {
  label: string;
  link: string;
};

const ITEM = [
  { label: "退会する", link: "/withdrawal" },
  // { label: "プライバシーポリシー", link: "" },
];

export const Footer: React.VFC = () => {
  return (
    <div className="p-10 text-xs text-gray-100 bg-gray-500">
      {ITEM.map((item) => {
        return (
          <Link href={item.link} key={item.label}>
            <div className="mb-5">{item.label}</div>
          </Link>
        );
      })}
      <footer>
        <div>©2021 yorimaru</div>
      </footer>
    </div>
  );
};
