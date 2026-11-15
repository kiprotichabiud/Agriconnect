export type ListingFieldErrors = Partial<
  Record<
    | "produceName"
    | "variety"
    | "description"
    | "quantity"
    | "unit"
    | "pricePerUnit"
    | "county"
    | "collectionArea"
    | "availableFrom"
    | "availableUntil",
    string
  >
>;

export type ListingFormState = {
  error?: string;
  fieldErrors?: ListingFieldErrors;
};
