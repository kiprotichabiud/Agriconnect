import { describe, expect, it } from "vitest";
import { assignRole, roleSelectionSchema } from "@/features/auth/role-selection";

describe("role selection", () => {
  it.each(["FARMER", "BUYER"] as const)("accepts %s", (role) => {
    expect(roleSelectionSchema.safeParse({ role }).success).toBe(true);
  });

  it.each(["ADMIN", "farmer", "OTHER", undefined])(
    "rejects unsupported role input %s",
    (role) => {
      expect(roleSelectionSchema.safeParse({ role }).success).toBe(false);
    },
  );

  it("creates a profile and safely repeats the same role choice", async () => {
    const profiles = new Map<string, "FARMER" | "BUYER">();
    const store: Parameters<typeof assignRole>[0] = {
      user: {
        async upsert({ where, create }) {
          const existing = profiles.get(where.clerkUserId);
          const role = existing ?? create.role;
          profiles.set(where.clerkUserId, role);
          return { role };
        },
      },
    };

    expect(await assignRole(store, "clerk_user_123", "FARMER")).toBe("saved");
    expect(await assignRole(store, "clerk_user_123", "FARMER")).toBe("saved");
    expect(profiles.get("clerk_user_123")).toBe("FARMER");
  });

  it("does not change an existing role", async () => {
    const store: Parameters<typeof assignRole>[0] = {
      user: {
        async upsert() {
          return { role: "FARMER" };
        },
      },
    };

    expect(await assignRole(store, "clerk_user_123", "BUYER")).toBe(
      "role-already-assigned",
    );
  });
});
