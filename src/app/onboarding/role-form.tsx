"use client";

import { useActionState } from "react";
import { selectRole, type RoleSelectionState } from "@/app/onboarding/actions";
import { Button } from "@/components/ui/button";

const initialState: RoleSelectionState = {};

export function RoleForm() {
  const [state, formAction, isPending] = useActionState(
    selectRole,
    initialState,
  );

  return (
    <form action={formAction} className="mt-6 grid gap-3">
      <Button
        className="h-auto min-h-16 justify-start whitespace-normal px-5 py-4 text-left"
        disabled={isPending}
        name="role"
        type="submit"
        value="FARMER"
      >
        <span>
          <span className="block font-semibold">I am a farmer</span>
          <span className="mt-1 block text-sm font-normal opacity-80">
            I have produce available to sell.
          </span>
        </span>
      </Button>
      <Button
        className="h-auto min-h-16 justify-start whitespace-normal px-5 py-4 text-left"
        disabled={isPending}
        name="role"
        type="submit"
        value="BUYER"
        variant="outline"
      >
        <span>
          <span className="block font-semibold">I am a buyer</span>
          <span className="mt-1 block text-sm font-normal opacity-80">
            I am looking to buy agricultural produce.
          </span>
        </span>
      </Button>
      {isPending ? (
        <p role="status" className="text-sm text-muted-foreground">
          Saving your choice…
        </p>
      ) : null}
      {state.error ? (
        <p role="alert" className="text-sm text-destructive">
          {state.error}
        </p>
      ) : null}
    </form>
  );
}
