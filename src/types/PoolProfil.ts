import { ProductIllustration } from "./generics"

export type Profil = {
    id: string // ex: PRFL-plat
    libelle: string // ex: Fond plat 1m20 maxi
    usage: "Détente"|"Jeux"|"Natation sportive"|"Plongeon"
    fond: "plat"|"incurvé"|"diamant"|"mini-fosse"
    taille: {
        hMin: number
        hMax: number
        hFixe: number
        Volume: number
    }
    illustrations: ProductIllustration[] // la première sert de vignette
}