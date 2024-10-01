import { atomic, atomicSelector, useAtomicValue } from "@lib/jotai";

export const tokenAtom = atomic<string | null>(null);

export const getToken = atomicSelector((get) => {
  const token = tokenAtom;

  return token;
});
