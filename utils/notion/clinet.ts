import { Client } from "@notionhq/client";

export function getClient(token: string) {
  return new Client({ auth: token });
}
