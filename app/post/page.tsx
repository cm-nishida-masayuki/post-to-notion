import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { create } from "./actions";
import Form from "./form";

export default async function NotionPostPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="w-full px-6 max-w-[1024px]">
      <h1 className="text-lg font-bold">Post Notion</h1>
      <Form create={create} />
    </div>
  );
}
