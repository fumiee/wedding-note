import type { VFC } from "react";
import type { Post } from "src/pages/search/postSearch";
import { useCallback, useState } from "react";
import { SearchForm } from "src/components/search/SearchForm";
import { SearchUserDisplay } from "src/components/display/SearchUserDisplay";
import { supabase } from "src/libs/supabase";

const WhSearch: VFC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const searchWh = useCallback(async (word: string) => {
    try {
      const res = await supabase
        .from("profiles")
        .select("name,avatar,userId:user_id,weddingHall:wedding_hall")
        .like("wedding_hall", `%${word}%`);
      if (res.error) throw res.error;
      setPosts(res.data);
    } catch (error) {
      console.error("error", error);
    }
  }, []);
  return (
    <div>
      <SearchForm how={"結婚式場"} handleSearch={searchWh} />
      <SearchUserDisplay posts={posts} />
    </div>
  );
};

export default WhSearch;
