"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { assignRole, roleSelectionSchema } from "@/features/auth/role-selection";
import { getPrismaClient } from "@/lib/db";
import { isClerkConfigured } from "@/lib/env";

export type RoleSelectionState = {
  error?: string;
};

export async function selectRole(
  _previousState: RoleSelectionState,
  formData: FormData,
): Promise<RoleSelectionState> {
  if (!isClerkConfigured()) {
    return { error: "Sign in is temporarily unavailable. Please try again later." };
  }

  const { userId } = await auth();

  if (!userId) {
    return { error: "Sign in before choosing an account type." };
  }

  const database = getPrismaClient();

  if (!database) {
    return { error: "Account setup is temporarily unavailable. Please try again later." };
  }

  const parsed = roleSelectionSchema.safeParse({
    role: formData.get("role"),
  });

  if (!parsed.success) {
    return { error: "Choose either Farmer or Buyer to continue." };
  }

  try {
    const result = await assignRole(database, userId, parsed.data.role);

    if (result === "role-already-assigned") {
      return {
        error: "This account already has an account type and cannot be changed here.",
      };
    }
  } catch {
    console.error("Failed to save an onboarding role.");
    return { error: "We could not save your choice. Please try again." };
  }

  redirect("/workspace");
}
