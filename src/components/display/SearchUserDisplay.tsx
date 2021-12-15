import Image from "next/image";
import Link from "next/link";
import type { VFC } from "react";
import type { Post } from "src/pages/search/postSearch";

type Props = {
  posts: Post[];
};
//検索後ユーザーのみを表示するテンプレート
export const SearchUserDisplay: VFC<Props> = (props) => {
  return (
    <div>
      {props.posts.length !== 0 ? (
        props.posts.map((post) => {
          return (
            <div key={post.user_id} className="mb-10 bg-gray-200">
              <div className=" flex min-w-max bg-gray-300">
                <Link href={`/${post.user_id}`}>
                  <a className="flex my-1 mx-2">
                    {post.avatar ? (
                      <Image src={post.avatar} alt="avatar" height={45} width={45} className="rounded-full" />
                    ) : (
                      <div className="bg-gray-200 rounded-full sm:w-28 sm:h-28" />
                    )}
                    <div className="flex items-center mx-3 text-sm">{post.name}</div>
                  </a>
                </Link>
              </div>
            </div>
          );
        })
      ) : (
        <p className="mb-10 text-gray-400">not found</p>
      )}
    </div>
  );
};
