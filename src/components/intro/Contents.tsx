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
    text: `各打ち合わせごとに記録したり、ドレスや装花などカテゴリー別にしたりと
    自由に記録できます。その時その時の思いや考えを文字にすることで頭の中が整理できます。`,
  },
  {
    icon: <BsBook size={50} color={"#5A5A5A"} className="m-auto" />,
    head: "ヨム",
    text: `他の花嫁さまの記録を閲覧できます。
    同じ都道府県の花嫁さまの記録から好みのドレスショップを見つけたり
    同じ式場の花嫁さまからのアドバイスが見れるかもしれません。`,
  },
  {
    icon: <BsCheck size={50} color={"#5A5A5A"} className="m-auto" />,
    head: "カクニン",
    text: `次の打ち合わせでプランナーさんに確認することや買うべきものを一覧に。終わったことにはチェックを入れて。
    他の花嫁さまの記録を読んでいると式場に確認しなきゃ！わたしもこれしたい！がきっとでてきます。
    そんなときはすぐに追加しておきましょう。`,
  },
];

export const Contents: React.VFC = () => {
  return (
    <div className="m-auto text-center">
      <p className="mt-8 text-4xl font-semibold">What's note?</p>
      <p className="mb-20">{"wedding noteでできること"}</p>
      {ITEM.map((item) => {
        return (
          <div key={item.head} className="p-5 m-3 mt-12 rounded-2xl border-4">
            <div>{item.icon}</div>
            <p className="my-3 text-xl font-semibold">{item.head}</p>
            <p className="m-auto max-w-90">{item.text}</p>
          </div>
        );
      })}
    </div>
  );
};
