import { ProductAttribute, ProductIllustration } from "./generics"

export type Stair = {
    id: string // ex: ESC-ORB
    libelle: string // ex: Orbis
    attributes: ProductAttribute[] // coloris, position, balnéo, banquette
    silouhette: string // SVG
    illustrations: ProductIllustration[] // la première sert de vignette
}