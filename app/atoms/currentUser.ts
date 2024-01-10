import { atom } from "recoil"

type User = {
  id: number,
  name: string,
  email: string,
}

export const currentUserAtom = atom<User | null>({
  key: "currentUser",
  default: null,
})
