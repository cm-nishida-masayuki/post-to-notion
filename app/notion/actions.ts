"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function create(formData: FormData) {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  const id = formData.get("id") ? Number(formData.get("id")) : undefined;

  const res = await supabase.from("target_notion").upsert({
    id: id,
    user_id: user.data.user?.id,
    integration_token: formData.get("integration_token") as string,
    database_id: formData.get("database_id") as string,
  });

  console.log(res);

  revalidatePath("/notion");
}
