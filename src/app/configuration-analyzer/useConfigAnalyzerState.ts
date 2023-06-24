import { create } from 'zustand';

interface ConfigAnalyzerState {
    isOpenAllDetails: boolean
    isTranslated: boolean
    toggleOpen: () => void
    toggleTranslation: () => void
}

export const useConfigAnalyzerState = create<ConfigAnalyzerState>((set) => ({
    isOpenAllDetails: false,
    isTranslated: false,
    toggleOpen: () => set(({ isOpenAllDetails }) => ({ isOpenAllDetails: !isOpenAllDetails })),
    toggleTranslation: () => set(({ isTranslated }) => ({ isTranslated: !isTranslated }))
}))