import { useState } from "react";
import { supabase } from "src/libs/supabase";
import type { definitions } from "types/supabase";

export const useFetchProfiles = () => {
  const [profile, setProfile] = useState<definitions["profiles"]>();

  const fetchProfiles = async (query: string) => {
    if (!query) return;
    try {
      const res = await supabase
        .from<definitions["profiles"]>("profiles")
        .select("name,avatar,wedding_hall,description")
        .eq("user_id", query)
        .single();
      if (res.error) throw res.error;
      setProfile(res.data);
    } catch (error) {
      console.error("error", error);
    }
  };
  return { profile, fetchProfiles };
};
