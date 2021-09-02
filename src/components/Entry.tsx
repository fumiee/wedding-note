import Image from "next/image";
import girl from "/public/girl.svg";

export const Entry: React.VFC = () => {
  return (
    <div className="my-12">
      <p className="font-medium text-2xl">{"登録してはじめよう"}</p>
      <p className="">{"自分だけのwedding note"}</p>
      <div className="flex justify-center">
        <Image src={girl} alt="girl" height={150} width={120} />
        <button className="text-xl border-4 h-16 w-36 mt-10 rounded-2xl">
          新規登録
        </button>
      </div>
    </div>
  );
};
