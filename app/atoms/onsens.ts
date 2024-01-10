import { atomFamily } from "recoil";
import { Onsen } from "../src/types/onsen";

export const onsensAtomFamily = atomFamily<Onsen[], string>({
  key: "onsensAtomFamily",
  default: [],
})
