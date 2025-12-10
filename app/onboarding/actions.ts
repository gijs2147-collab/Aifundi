"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function submitOnboarding(formData: {
  telefoonnummer: string;
  adres: string;
  postcode: string;
  woonplaats: string;
  vermogensherkomst: string;
}) {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Update profile with NAW data and set kyc_status to verified
  const { error } = await supabase
    .from("profiles")
    .update({
      telefoonnummer: formData.telefoonnummer,
      adres: formData.adres,
      postcode: formData.postcode,
      woonplaats: formData.woonplaats,
      vermogensherkomst: formData.vermogensherkomst,
      kyc_status: "verified",
    })
    .eq("id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

