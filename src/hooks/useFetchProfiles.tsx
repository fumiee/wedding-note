import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import { useState } from "react";
import { supabase } from "src/libs/supabase";
import type { definitions } from "src/types/supabaseTypes";

export type Profile = {
  name?: definitions["profiles"]["name"];
  avatar?: definitions["profiles"]["avatar"];
  weddingHall?: definitions["profiles"]["wedding_hall"];
  description?: definitions["profiles"]["description"];
};

export const useFetchProfiles = () => {
  const [profile, setProfile] = useState<Profile>();

  const fetchProfiles = async (userId: string) => {
    if (!userId) return;
    try {
      const res: PostgrestSingleResponse<Profile> = await supabase
        .from("profiles")
        .select("name,avatar,weddingHall:wedding_hall,description")
        .eq("user_id", userId)
        .single();
      if (res.error) throw res.error;
      setProfile(res.data);
    } catch (error) {
      console.error("error", error);
    }
  };
  return { profile, fetchProfiles };
};
