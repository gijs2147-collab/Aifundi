"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function approveKYC(userId: string) {
  const supabase = await createClient();

  // Check of gebruiker admin is
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
    return;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    redirect("/dashboard");
    return;
  }

  // Update KYC status
  const { error } = await supabase
    .from("profiles")
    .update({ kyc_status: "verified" })
    .eq("id", userId);

  if (error) {
    console.error("Error approving KYC:", error.message);
    // Revalidate anyway to refresh the page
    revalidatePath("/admin");
    return;
  }

  revalidatePath("/admin");
}

