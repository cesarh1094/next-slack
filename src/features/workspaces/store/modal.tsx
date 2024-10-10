import { atom, useAtom } from "jotai";

const modalState = atom(false);

export function useCreateWorkSpaceModal() {
  return useAtom(modalState);
}
