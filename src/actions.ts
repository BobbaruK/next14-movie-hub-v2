"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

export default async function submitSearchForm(formData: FormData) {
  const form = Object.fromEntries(formData);
  
  const formSchema = z.object({
    searchQuery: z.string().min(2, {
      message: "Search query must be at least 2 characters.",
    }),
  });

  const data = formSchema.parse(form);

  redirect(`/search?query=${data.searchQuery}`);
}
