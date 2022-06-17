import { createClient } from "@supabase/supabase-js";

// 環境変数のロード
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;

// 環境変数が設定されてない場合、エラー
if (!SUPABASE_URL) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL");
}

if (!SUPABASE_KEY) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_KEY");
}

export const client = createClient(SUPABASE_URL, SUPABASE_KEY);

export const getTitles = async () => {
  const { data, error } = await client
    .from("comic_title")
    .select("*")
    .order("title");

  if (!error && data) {
    return data;
  }
  return [];
};
