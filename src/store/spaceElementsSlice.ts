import type SpaceElement from '@/model/SpaceElement'
import { type StateCreator } from 'zustand'

export interface ISpaceElementsSlice {
    root: SpaceElement | null,
    current: SpaceElement | null,

    setRoot: (newRoot: SpaceElement) => void
    setCurrent: (element: SpaceElement) => void
} 
export const createSpaceElementsSlice:StateCreator<ISpaceElementsSlice, [], [], ISpaceElementsSlice>=  (set) => ({
    root: null,
    current: null,

    setRoot(newRoot) {
        set({current: newRoot, root: newRoot});
    },

    setCurrent(element) {
        set({current: element});
    }
})