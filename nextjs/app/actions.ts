"use server";

import { redirect } from "next/navigation";

export async function subscribe(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  redirect(`/subscribed?email=${encodeURIComponent(email)}`);
}
