type ITEM = {
  label: string;
  link: string;
};

const ITEM = [
  { label: "利用規約", link: "" },
  { label: "プライバシーポリシー", link: "" },
];

export const Footer: React.VFC = () => {
  return (
    <div className="p-10 text-gray-100 bg-gray-500">
      {ITEM.map((item) => {
        return (
          <div key={item.label} className="mb-5">
            {item.label}
          </div>
        );
      })}
      <footer>
        <div>©2021 yorimaru</div>
      </footer>
    </div>
  );
};
