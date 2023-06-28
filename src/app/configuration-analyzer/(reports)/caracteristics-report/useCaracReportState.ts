import { create } from 'zustand';
import config from "./../../configuration_V0.json";

interface CaracReportState {
    caracteristics: any[]
    isAlphabeticSort: boolean
    isSystemChoicesFilteredOut: boolean
    toggleAlphaSort: () => void
    toggleFilterOutSystem: () => void
}

export const useCaracReportState = create<CaracReportState>((set) => ({
    caracteristics: outputCaracteristics(false, false),
    isAlphabeticSort: false,
    isSystemChoicesFilteredOut: false,
    toggleAlphaSort: () => { set(state => {
        const newIsAlphabeticSort = !state.isAlphabeticSort;
        return ({ isAlphabeticSort: newIsAlphabeticSort, caracteristics: outputCaracteristics(newIsAlphabeticSort, state.isSystemChoicesFilteredOut) })
    })},
    toggleFilterOutSystem: () => { set(state => {
        const newIsSystemChoicesFilteredOut = !state.isSystemChoicesFilteredOut;
        return ({ isSystemChoicesFilteredOut: newIsSystemChoicesFilteredOut, caracteristics: outputCaracteristics(state.isAlphabeticSort, newIsSystemChoicesFilteredOut) })
    })}
}))

/**
 * UTILS
 */

function outputCaracteristics(alphaSort:boolean, systemFilter:boolean) {
    const rawCaracs = [...config.rootItem.characteristics];

    switch(true) {
        case (alphaSort && systemFilter):
            return rawCaracs
                .sort((a, b) => (a.id > b.id) ? 1 : (a.id < b.id) ? -1 : 0)
                .filter(caracItem => !(caracItem?.values && caracItem?.values.some(valueItem => ((valueItem as any)?.author === "System"))));
        case (alphaSort && !systemFilter):
            return rawCaracs.sort((a, b) => (a.id > b.id) ? 1 : (a.id < b.id) ? -1 : 0);
        case (!alphaSort && systemFilter):
            return rawCaracs.filter(caracItem => !(caracItem?.values && caracItem?.values.some(valueItem => ((valueItem as any)?.author === "System"))));
        default:
            return rawCaracs;
    }
}