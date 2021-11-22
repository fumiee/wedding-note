import type { VFC } from "react";
import Link from "next/link";
import { GoComment } from "react-icons/go";

type Props = {
  postId: string;
};

export const CommentButton: VFC<Props> = (props) => {
  return (
    <div className="flex justify-center">
      <Link href={`comment/${props.postId}`}>
        <a>
          <GoComment size={22} color={"#5A5A5A"} />
        </a>
      </Link>
    </div>
  );
};
