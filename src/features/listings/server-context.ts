import "server-only";

import { auth } from "@clerk/nextjs/server";
import { canManageListings } from "@/features/listings/domain";
import { getPrismaClient } from "@/lib/db";
import { isClerkConfigured } from "@/lib/env";

export async function getFarmerContext() {
  if (!isClerkConfigured()) return { status: "unavailable" } as const;

  const { userId } = await auth();
  if (!userId) return { status: "signed-out" } as const;

  const database = getPrismaClient();
  if (!database) return { status: "unavailable" } as const;

  try {
    const profile = await database.user.findUnique({
      where: { clerkUserId: userId },
      select: { id: true, role: true },
    });

    if (!profile) return { status: "no-profile" } as const;
    if (!canManageListings(profile.role)) return { status: "forbidden" } as const;

    return { status: "ok", database, farmerId: profile.id } as const;
  } catch {
    console.error("Failed to verify listing permissions.");
    return { status: "unavailable" } as const;
  }
}
