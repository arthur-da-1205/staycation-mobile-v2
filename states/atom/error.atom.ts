import { atomic } from "@lib/jotai";

export const errorAtom = atomic<Error | null>(null);
