import type { Post } from "src/pages/search/postSearch";
import type { VFC } from "react";
import { useCallback, useState } from "react";
import { LoginedLayout } from "src/components/layout/LoginedLayout";
import { SearchForm } from "src/components/search/SearchForm";
import { SearchUserDisplay } from "src/components/display/SearchUserDisplay";
import { supabase } from "src/libs/supabase";

const NameSearch: VFC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const searchName = useCallback(async (word: string) => {
    try {
      const res = await supabase.from("profiles").select("name,avatar,user_id,wedding_hall").like("name", `%${word}%`);
      if (res.error) throw res.error;
      setPosts(res.data);
    } catch (error) {
      console.error("error", error);
    }
  }, []);
  return (
    <LoginedLayout>
      <SearchForm how={"ナマエ"} handleSearch={searchName} />
      <SearchUserDisplay posts={posts} />
    </LoginedLayout>
  );
};

export default NameSearch;
