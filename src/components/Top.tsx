import Image from "next/image";
import eyecatch from "/public/eyecatch.svg";

export const Top: React.VFC = () => {
  return (
    <div className="flex justify-center">
      <Image src={eyecatch} alt="boy and girl" height={233} width={277} />
      <p>{`プロポースから結婚式当日までのキロク`}</p>
    </div>
  );
};
