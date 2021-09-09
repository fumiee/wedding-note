import Image from "next/image";
import girl from "/public/girl.svg";
import Link from "next/link";

export const Entry: React.VFC = () => {
  return (
    <div className="my-12">
      <p className="font-medium text-2xl">{"あなたも書いてみよう"}</p>
      <p className="">{"自分だけのwedding note"}</p>
      <div className="flex justify-center">
        <Image src={girl} alt="girl" height={150} width={120} />
        <Link href="/">
          <a className="text-xl border-4 h-16 w-36 mt-10 pt-1 rounded-2xl">
            ログイン
            <div className="text-xs">/ 新規登録</div>
          </a>
        </Link>
      </div>
    </div>
  );
};
