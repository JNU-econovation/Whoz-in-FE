import { create } from 'zustand';

export const useMainActions = create((set) => ({
    triggerOverlayClose: () => {},
    setTriggerOverlayClose: (fn) => set({ triggerOverlayClose: fn }),
}));