import type { Post } from "src/pages/search/postSearch";
import type { VFC } from "react";
import { useCallback, useState } from "react";
import { SearchForm } from "src/components/search/SearchForm";
import { SearchUserDisplay } from "src/components/display/SearchUserDisplay";
import { supabase } from "src/libs/supabase";

const NameSearch: VFC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const searchName = useCallback(async (word: string) => {
    try {
      const res = await supabase
        .from("profiles")
        .select("name,avatar,userId:user_id,weddingHall:wedding_hall")
        .like("name", `%${word}%`);
      if (res.error) throw res.error;
      setPosts(res.data);
    } catch (error) {
      console.error("error", error);
    }
  }, []);
  return (
    <div>
      <SearchForm how={"ナマエ"} handleSearch={searchName} />
      <SearchUserDisplay posts={posts} />
    </div>
  );
};

export default NameSearch;
