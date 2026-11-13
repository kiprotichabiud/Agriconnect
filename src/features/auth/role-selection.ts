import { z } from "zod";
import type { UserRole } from "@/generated/prisma/client";

export const USER_ROLES = ["FARMER", "BUYER"] as const;

export const roleSelectionSchema = z.object({
  role: z.enum(USER_ROLES),
});

type RoleStore = {
  user: {
    upsert(args: {
      where: { clerkUserId: string };
      create: { clerkUserId: string; role: UserRole };
      update: Record<string, never>;
    }): Promise<{ role: UserRole }>;
  };
};

export type RoleAssignmentResult = "saved" | "role-already-assigned";

export async function assignRole(
  store: RoleStore,
  clerkUserId: string,
  role: UserRole,
): Promise<RoleAssignmentResult> {
  const profile = await store.user.upsert({
    where: { clerkUserId },
    create: { clerkUserId, role },
    update: {},
  });

  return profile.role === role ? "saved" : "role-already-assigned";
}
