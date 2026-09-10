import { create } from 'zustand';
import { createSpaceElementsSlice, type ISpaceElementsSlice } from './spaceElementsSlice';

export type ViewOptions = {
    showFiles: boolean;
};

export type MainStore = ISpaceElementsSlice & {
    viewOptions: ViewOptions;
};

export const useMainStore = create<MainStore>()((...args) => ({
    viewOptions: {
        showFiles: false
    },
    ...createSpaceElementsSlice(...args),
}));
