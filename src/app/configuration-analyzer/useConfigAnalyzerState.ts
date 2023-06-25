import { create } from 'zustand';
import translationsCodex from "./translations_V0.json";
import groupBy from "lodash/groupBy";

type TradObj = {
    id: string
    translation: { language:string, name: string, description?: string }[]
}
type ProductObj = TradObj & {
    characteristicGroups: any[]
}
type CaracteristicsObj = TradObj & {
    possibleValues?: any[]
}

const extractTranslation = (tradObj:TradObj) => {
    const formattedTranslations = tradObj.translation.reduce((acc, curr) => {
        acc[curr.language.toUpperCase()] = curr.name;

        return acc;
    }, ({ EN: null, FR: null, DE: null, ES: null } as any));

    return {
        id: tradObj.id,
        ...formattedTranslations
    }
}
const allTradObj = [...translationsCodex.products, ...translationsCodex.classes, ...translationsCodex.characteristics].map(extractTranslation);
const translationMaps = allTradObj
    .reduce((acc, curr) => {
        acc.EN.set(curr.id, curr.EN);
        acc.FR.set(curr.id, curr.FR);
        acc.DE.set(curr.id, curr.DE);
        acc.ES.set(curr.id, curr.ES);
        return acc;
    }, {
        "EN": new Map(),
        "FR": new Map(),
        "DE": new Map(),
        "ES": new Map()
    });
//const allDuplicates = Object.entries(groupBy(allTradObj, 'id')).filter(entry => entry[1].length > 1);
//console.log(translationMaps);
// console.info("all translations duplicates ID", allDuplicates);

interface ConfigAnalyzerState {
    isOpenAllDetails: boolean
    translation: "tech"|"EN"|"FR"|"DE"|"ES"
    toggleOpen: () => void
    translateTo: (target:"tech"|"EN"|"FR"|"DE"|"ES") => void
    t: (id:string) => string
}

export const useConfigAnalyzerState = create<ConfigAnalyzerState>((set) => ({
    isOpenAllDetails: false,
    translation: "tech",
    toggleOpen: () => set(({ isOpenAllDetails }) => ({ isOpenAllDetails: !isOpenAllDetails })),
    translateTo: (target) => set(() => ({ translation: target, t: (id:string) => {
        if(target === "tech") return id;

        return translationMaps[target].get(id) ?? `${ id } (no trad)`;
    } })),
    t: (id:string) => id
}))