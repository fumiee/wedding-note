import { useEffect } from "react";
import { useGetPost } from "src/libs/useGetPost";
import Image from "next/image";

export const LatestPosts = () => {
  const { fetchPosts, posts } = useGetPost();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);
  return (
    <div className="mb-16">
      <p className="m-16 text-xl font-bold tracking-widest text-gray-400">みんなのキロク</p>
      {posts?.map((post) => {
        return (
          <div key={post.id} className="mb-10 bg-gray-100">
            <div className=" flex min-w-max bg-gray-200">
              <a className="flex my-1 mx-2">
                {post.user.avatar ? (
                  <Image src={post.user.avatar} alt="avatar" height={45} width={45} className="rounded-full" />
                ) : (
                  <div className="bg-gray-200 rounded-full sm:w-28 sm:h-28" />
                )}
                <div className="flex items-center mx-3 text-sm">{post.user.name}</div>
              </a>
            </div>
            <details className="block whitespace-pre-wrap break-words">
              <summary className="list-none">
                <div className="px-2 text-left">{post.text.substr(0, 75)}</div>
              </summary>
              {post.text.length > 75 ? <div className="px-2 pb-1 text-left">{post.text.substr(75, 100000)}</div> : null}
            </details>
          </div>
        );
      })}
    </div>
  );
};
