import { GiPencil } from "react-icons/gi";
import { BsBook } from "react-icons/bs";
import { BsCheck } from "react-icons/bs";

type ITEM = {
  icon: string;
  head: string;
  text: string;
};

const ITEM = [
  {
    icon: <GiPencil size={50} color={"#5A5A5A"} className="m-auto" />,
    head: "キロク",
    text: `打ち合わせ内容を記録したり思いや考えを自由に。
    後から振り返るのも楽しいものです。`,
  },
  {
    icon: <BsBook size={50} color={"#5A5A5A"} className="m-auto" />,
    head: "ヨム",
    text: `他の花嫁さまのキロクからヒントを得たり、同じ境遇の方を見つけたり。`,
  },
  {
    icon: <BsCheck size={50} color={"#5A5A5A"} className="m-auto" />,
    head: "カクニン",
    text: `TODOリストでしっかり確認。漏れをなくしましょう。`,
  },
];

export const Contents: React.VFC = () => {
  return (
    <div className="m-auto text-center">
      <p className="mt-8 text-4xl font-semibold">What's note?</p>
      <p className="mb-20">{"wedding noteでできること"}</p>
      {ITEM.map((item) => {
        return (
          <div key={item.head} className="p-10 m-3 mt-12 rounded-2xl border-4">
            <div>{item.icon}</div>
            <p className="my-7 text-xl font-semibold tracking-widest">{item.head}</p>
            <p className="m-auto">{item.text}</p>
          </div>
        );
      })}
    </div>
  );
};
