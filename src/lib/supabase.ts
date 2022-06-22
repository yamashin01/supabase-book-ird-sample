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

export const getSubtitles = async (id: string) => {
  let { data, error } = await client
    .from("comic_title")
    .select("*")
    .eq("id", id);

  if (!error && data) {
    const title = data[0];
    ({ data, error } = await client
      .from("comic_subtitle")
      .select("*")
      .order("volume", { ascending: true })
      .eq("title_id", id));
    if (!error && data) {
      return { title: title, subtitles: data };
    } else {
      return { title: title, subtitles: null };
    }
  }
  return { title: null, subtitles: null };
};
