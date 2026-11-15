"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PRODUCE_UNIT_LABELS, PRODUCE_UNITS, type ListingInput } from "@/features/listings/schema";
import type { ListingFormState } from "@/features/listings/types";

type ListingAction = (
  previousState: ListingFormState,
  formData: FormData,
) => Promise<ListingFormState>;

const initialState: ListingFormState = {};

type FormValues = Partial<ListingInput>;

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? <p className="mt-1 text-sm text-destructive" id={`${id}-error`}>{message}</p> : null;
}

export function ListingForm({
  action,
  initialValues = {},
  submitLabel,
}: {
  action: ListingAction;
  initialValues?: FormValues;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const errors = state.fieldErrors;

  return (
    <form action={formAction} className="space-y-6">
      {state.error ? <p className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive" role="alert">{state.error}</p> : null}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="produceName">Produce name</Label>
          <Input id="produceName" name="produceName" required minLength={2} maxLength={100} defaultValue={initialValues.produceName} aria-invalid={Boolean(errors?.produceName)} aria-describedby={errors?.produceName ? "produceName-error" : undefined} />
          <FieldError id="produceName" message={errors?.produceName} />
        </div>
        <div>
          <Label htmlFor="variety">Variety <span className="font-normal text-muted-foreground">(optional)</span></Label>
          <Input id="variety" name="variety" maxLength={100} defaultValue={initialValues.variety ?? ""} aria-invalid={Boolean(errors?.variety)} aria-describedby={errors?.variety ? "variety-error" : undefined} />
          <FieldError id="variety" message={errors?.variety} />
        </div>
        <div>
          <Label htmlFor="unit">Unit</Label>
          <Select id="unit" name="unit" required defaultValue={initialValues.unit ?? "KG"} aria-invalid={Boolean(errors?.unit)} aria-describedby={errors?.unit ? "unit-error" : undefined}>
            {PRODUCE_UNITS.map((unit) => <option key={unit} value={unit}>{PRODUCE_UNIT_LABELS[unit]}</option>)}
          </Select>
          <FieldError id="unit" message={errors?.unit} />
        </div>
        <div>
          <Label htmlFor="quantity">Quantity available</Label>
          <Input id="quantity" name="quantity" type="number" min="0.001" step="0.001" required inputMode="decimal" placeholder="e.g. 50" defaultValue={initialValues.quantity} aria-invalid={Boolean(errors?.quantity)} aria-describedby={errors?.quantity ? "quantity-help quantity-error" : "quantity-help"} />
          <p className="mt-1 text-xs text-muted-foreground" id="quantity-help">Up to 3 decimal places.</p>
          <FieldError id="quantity" message={errors?.quantity} />
        </div>
        <div>
          <Label htmlFor="pricePerUnit">Asking price per unit (KES)</Label>
          <Input id="pricePerUnit" name="pricePerUnit" type="number" min="0.01" step="0.01" required inputMode="decimal" placeholder="e.g. 120.00" defaultValue={initialValues.pricePerUnit} aria-invalid={Boolean(errors?.pricePerUnit)} aria-describedby={errors?.pricePerUnit ? "pricePerUnit-error" : undefined} />
          <FieldError id="pricePerUnit" message={errors?.pricePerUnit} />
        </div>
        <div>
          <Label htmlFor="county">County</Label>
          <Input id="county" name="county" required minLength={2} maxLength={80} placeholder="e.g. Nakuru" defaultValue={initialValues.county} aria-invalid={Boolean(errors?.county)} aria-describedby={errors?.county ? "county-error" : undefined} />
          <FieldError id="county" message={errors?.county} />
        </div>
        <div>
          <Label htmlFor="collectionArea">Collection area</Label>
          <Input id="collectionArea" name="collectionArea" required minLength={2} maxLength={120} placeholder="Town, market or nearby area" defaultValue={initialValues.collectionArea} aria-invalid={Boolean(errors?.collectionArea)} aria-describedby={errors?.collectionArea ? "collectionArea-error" : undefined} />
          <FieldError id="collectionArea" message={errors?.collectionArea} />
        </div>
        <div>
          <Label htmlFor="availableFrom">Available from</Label>
          <Input id="availableFrom" name="availableFrom" type="date" required defaultValue={initialValues.availableFrom} aria-invalid={Boolean(errors?.availableFrom)} aria-describedby={errors?.availableFrom ? "availableFrom-error" : undefined} />
          <FieldError id="availableFrom" message={errors?.availableFrom} />
        </div>
        <div>
          <Label htmlFor="availableUntil">Available until <span className="font-normal text-muted-foreground">(optional)</span></Label>
          <Input id="availableUntil" name="availableUntil" type="date" defaultValue={initialValues.availableUntil ?? ""} aria-invalid={Boolean(errors?.availableUntil)} aria-describedby={errors?.availableUntil ? "availableUntil-error" : undefined} />
          <FieldError id="availableUntil" message={errors?.availableUntil} />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="description">Description <span className="font-normal text-muted-foreground">(optional)</span></Label>
          <Textarea id="description" name="description" maxLength={1000} rows={4} placeholder="Add useful details about this produce." defaultValue={initialValues.description ?? ""} aria-invalid={Boolean(errors?.description)} aria-describedby={errors?.description ? "description-error" : undefined} />
          <FieldError id="description" message={errors?.description} />
        </div>
      </div>
      <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-end">
        <Button disabled={pending} type="submit" size="lg">{pending ? "Saving listing…" : submitLabel}</Button>
      </div>
    </form>
  );
}
