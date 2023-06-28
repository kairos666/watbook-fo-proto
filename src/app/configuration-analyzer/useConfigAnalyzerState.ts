import { create } from 'zustand';
import translationsCodex from "./translations_V0.json";
import { configToTradOutput, JSONTradOutput, TradOutput, tradOutputAnalyzer } from './translationIndexer';

const allTrads:TradOutput[] = configToTradOutput(translationsCodex);

// const tradAnalysis = tradOutputAnalyzer(allTrads);
// console.info(`${ tradAnalysis.entriesCount } traductions détectées, dont ${ tradAnalysis.uniqueIdEntriesCount } ID uniques`);
// console.log("ci-dessous le détail (FR) des IDs dupliquées");
// const duplicatesDetails = tradAnalysis.duplicates.map(duplicat => {
//     return { id: duplicat[1][0].id, trads: duplicat[1].map(trad => trad.translations.FR).join(' ; ') }
// });
// console.table(duplicatesDetails);
//console.log(JSONTradOutput(allTrads, "FR")); // génére une fichier de traductions par langue à plat

const translationMaps = allTrads
    .reduce((acc, curr) => {
        acc.EN.set(curr.path, curr.translations.EN);
        acc.FR.set(curr.path, curr.translations.FR);
        acc.DE.set(curr.path, curr.translations.DE);
        acc.ES.set(curr.path, curr.translations.ES);
        return acc;
    }, {
        "EN": new Map(),
        "FR": new Map(),
        "DE": new Map(),
        "ES": new Map()
    });

const translateToBuilder = (target:"tech"|"EN"|"FR"|"DE"|"ES") => {
    switch(target) {
        case "tech":
            return (key:string, _prefix:string = '', _suffix:string = '') => key;

        default:
            const targetLanguageMap = translationMaps[target];
            return (key:string, prefix:string = '', suffix:string = '') => {
                const fullKey:string = `${prefix}${key}${suffix}`;

                return targetLanguageMap.get(fullKey) ?? `${ key } (no trad)`;
            }
    }
}

interface ConfigAnalyzerState {
    isOpenAllDetails: boolean
    translation: "tech"|"EN"|"FR"|"DE"|"ES"
    toggleOpen: () => void
    translateTo: (target:"tech"|"EN"|"FR"|"DE"|"ES") => void
    t: (id:string, prefix?:string, suffix?:string) => string
}

export const useConfigAnalyzerState = create<ConfigAnalyzerState>((set) => ({
    isOpenAllDetails: false,
    translation: "tech",
    toggleOpen: () => set(({ isOpenAllDetails }) => ({ isOpenAllDetails: !isOpenAllDetails })),
    translateTo: (target) => set(() => ({ translation: target, t: translateToBuilder(target) })),
    t: translateToBuilder("tech")
}))