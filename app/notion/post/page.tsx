import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { create } from "./actions";

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
      <form action={create} className="flex flex-col gap-2">
        <div className="flex flex-col w-full">
          <input
            type="text"
            id="notion"
            name="title"
            className="border rounded-lg p-2 w-full"
          />
        </div>
        <div>
          <button
            type="submit"
            className="rounded bg-slate-600 text-white py-2 px-4"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
