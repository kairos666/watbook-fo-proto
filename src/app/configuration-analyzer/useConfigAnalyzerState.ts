import { create } from 'zustand';

interface ConfigAnalyzerState {
    isOpenAllDetails: boolean
    translation: "tech"|"EN"|"FR"|"DE"|"ES"
    toggleOpen: () => void
    translateTo: (target:"tech"|"EN"|"FR"|"DE"|"ES") => void
}

export const useConfigAnalyzerState = create<ConfigAnalyzerState>((set) => ({
    isOpenAllDetails: false,
    translation: "tech",
    toggleOpen: () => set(({ isOpenAllDetails }) => ({ isOpenAllDetails: !isOpenAllDetails })),
    translateTo: (target) => set(() => ({ translation: target }))
}))