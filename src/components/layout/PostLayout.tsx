import Image from "next/image";
import type { VFC } from "react";
import type { Post } from "src/components/post/Posts";
import type { definitions } from "src/types/supabase";

type Props = {
  posts: Post[];
  profile: definitions["profiles"];
};

export const PostLayout: VFC<Props> = (props) => {
  return (
    <div>
      {props.posts.length === 0 ? (
        <p className="mb-10">キロクがありません。</p>
      ) : (
        props.posts.map((post) => {
          return (
            <div key={post.id} className="mb-10 bg-gray-200">
              <div className=" flex min-w-max bg-gray-300">
                <a className="flex">
                  <div className="my-1 mx-2">
                    {props.profile.avatar ? (
                      <Image src={props.profile.avatar} alt="avatar" height={45} width={45} className="rounded-full" />
                    ) : (
                      <div className="bg-gray-200 rounded-full sm:w-28 sm:h-28" />
                    )}
                  </div>
                  <div className="flex items-center mx-3 text-sm">{props.profile?.name}</div>
                </a>
                <div className="flex items-center">{/* <Like /> */}</div>
              </div>
              <details className="block whitespace-pre-wrap break-words">
                <summary className="list-none">
                  <div className="px-2 text-left">{post.text.substr(0, 75)}</div>
                </summary>
                {post.text.length > 75 ? (
                  <div className="px-2 pb-1 text-left">{post.text.substr(75, 100000)}</div>
                ) : null}
              </details>
            </div>
          );
        })
      )}
    </div>
  );
};
