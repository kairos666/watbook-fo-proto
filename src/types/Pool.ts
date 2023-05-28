import { ProductIllustration } from "./generics"

export type Pool = {
    id: string // ex: CEL
    libelle: string // ex: Céline
    forme: "rectangulaire"|"ovale"|"irrégulière"|"slim"
    estInversable: boolean
    tailles: {
        suffix: string // ex: 8 (CEL + 8) = CEL8
        longueurA: number
        largeurB: number
        largeurC: number
        superficie: number
        panelOffset: number[] // variations nb panneaux en plus ou en moins pour raccourcissement ou rallongement
    }[]
    silouhette: string // SVG
    illustrations: ProductIllustration[] // la première sert de vignette
}