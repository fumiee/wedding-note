import type { VFC } from "react";
import { useRouter } from "next/router";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";

export type EditPageButtonProps = { id: string };

export const EditPageLinkButton: VFC<EditPageButtonProps> = (props) => {
  const router = useRouter();
  const handleClick = () => {
    router.push({ pathname: "/edit", query: { id: props.id } });
  };
  return (
    <button onClick={handleClick}>
      <IoEllipsisHorizontalSharp size={25} color={"#5A5A5A"} className="" />
    </button>
  );
};
