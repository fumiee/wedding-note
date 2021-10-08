import { LoginedLayout } from "src/components/layout/LoginedLayout";
import { SearchForm } from "src/components/search/SearchForm";
import { useState } from "react";
import type { Post } from "src/components/post/Posts";
import Image from "next/image";

const Search = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  return (
    <LoginedLayout>
      <SearchForm setPosts={setPosts} />
      {posts.length === 0 ? (
        <p className="mb-10">キロクがありません。</p>
      ) : (
        posts.map((post) => {
          return (
            <div key={post.id} className="mb-10 bg-gray-200">
              <div className=" flex min-w-max bg-gray-300">
                <a className="flex">
                  <div className="my-1 mx-2">
                    {post.user.avatar ? (
                      <Image src={post.user.avatar} alt="avatar" height={45} width={45} className="rounded-full" />
                    ) : (
                      <div className="bg-gray-200 rounded-full sm:w-28 sm:h-28" />
                    )}
                  </div>
                  <div className="flex items-center mx-3 text-sm">{post.user.name}</div>
                </a>
                <div className="flex items-center">{/* <Like /> */}</div>
              </div>
              <details className="block">
                <summary className="list-none">
                  <div className="px-2 text-left">{post.text.substr(0, 67)}</div>
                </summary>
                {post.text.length > 67 ? (
                  <div className="px-2 pb-1 text-left">{post.text.substr(68, 100000)}</div>
                ) : null}
              </details>
            </div>
          );
        })
      )}
    </LoginedLayout>
  );
};

export default Search;
