import Image from "next/image";
import girl from "/public/girl.svg";
import Link from "next/link";

export const Entry: React.VFC = () => {
  return (
    <div className="my-12">
      <p className="text-2xl font-medium">{"あなたも書いてみよう"}</p>
      <p className="">{"自分だけのwedding note"}</p>
      <div className="flex justify-center">
        <Image src={girl} alt="girl" height={150} width={120} />
        <Link href="/">
          <a className="pt-1 mt-10 w-36 h-16 text-xl rounded-2xl border-4">
            ログイン
            <div className="text-xs">/ 新規登録</div>
          </a>
        </Link>
      </div>
    </div>
  );
};
