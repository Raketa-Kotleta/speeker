import { create } from "zustand";
import { createSpaceElementsSlice, type ISpaceElementsSlice } from "./spaceElementsSlice";

export type MainStore = ISpaceElementsSlice;

export const useMainStore = create<MainStore>()((...args) => ({
    ...createSpaceElementsSlice(...args),
}));