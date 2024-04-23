"use server";

import { getClient } from "@/utils/notion/clinet";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function create(formData: FormData) {
  const supabase = createClient();

  let targetNotion: any = null;
  const { data } = await supabase.from("target_notion").select();
  if (data) {
    targetNotion = data[0];
  }

  const notion = getClient(targetNotion.integration_token);

  const res = await notion.pages.create({
    parent: {
      database_id: targetNotion.database_id,
    },
    properties: {
      title: {
        title: [
          {
            text: {
              content: formData.get("title") as string,
            },
          },
        ],
      },
    },
  });

  console.log(res);
  revalidatePath("/post");
}
