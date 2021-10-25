import { createClient } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];
    const { user, error } = await supabase.auth.api.getUser(accessToken as string);
    if (error) throw error;
    if (!user) return res.status(401).send("NG");
    const { error: deleteUserError } = await supabase.auth.api.deleteUser(user.id, SUPABASE_SERVICE_ROLE_KEY);
    if (deleteUserError) throw deleteUserError;
    return res.status(200).send("OK");
  } catch (error) {
    res.status(500).send("NG");
  }
};
