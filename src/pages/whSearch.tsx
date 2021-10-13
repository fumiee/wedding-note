import { useCallback, useState } from "react";
import { LoginedLayout } from "src/components/layout/LoginedLayout";
import type { Post } from "src/components/post/Posts";
import { SearchForm } from "src/components/search/SearchForm";
import { SearchUserDisplay } from "src/components/layout/SearchUserDisplay";
import { supabase } from "src/libs/supabase";

const WhSearch = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const searchWh = useCallback(async (word: string) => {
    try {
      const res = await supabase
        .from("profiles")
        .select("name,avatar,user_id,wedding_hall")
        .like("wedding_hall", `%${word}%`);
      if (res.error) throw res.error;
      setPosts(res.data);
    } catch (error) {
      console.error("error", error);
    }
  }, []);
  return (
    <LoginedLayout>
      <SearchForm how={"結婚式場"} handleSearch={searchWh} />
      <SearchUserDisplay posts={posts} />
    </LoginedLayout>
  );
};

export default WhSearch;
