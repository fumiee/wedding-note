import Image from "next/image";
import eyecatch from "/public/eyecatch.svg";

export const Top: React.VFC = () => {
  return (
    <div className="text-center">
      <Image
        src={eyecatch}
        alt="boy and girl"
        height={233}
        width={277}
        className="flex justify-center"
      />
      <p className="mb-16">{`プロポースから結婚式当日までのキロク`}</p>
    </div>
  );
};
