import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { create } from "./actions";

export default async function Notion() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  let notion: any = null;

  const { data: notions } = await supabase.from("target_notion").select();
  if (notions) {
    notion = notions[0];
  }

  return (
    <div className="w-full px-6 max-w-[1024px]">
      <h1 className="text-lg font-bold">Notion情報</h1>
      <form action={create} className="flex flex-col gap-2">
        <div className="flex flex-col w-full">
          <label htmlFor="notion">ID</label>
          <input
            type="text"
            id="notion"
            name="id"
            className="border rounded-lg p-2 w-full"
            defaultValue={notion ? notion.id : undefined}
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="notion">Integration Token</label>
          <input
            type="text"
            id="notion"
            name="integration_token"
            className="border rounded-lg p-2 w-full"
            defaultValue={notion ? notion.integration_token : undefined}
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="notion">Database Id</label>
          <input
            type="text"
            id="notion"
            name="database_id"
            className="border rounded-lg p-2 w-full"
            defaultValue={notion ? notion.database_id : undefined}
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
