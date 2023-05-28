export type ProductAttribute = {
    libelle: string // ex: coloris
    values: {
        libelle: string // ex: vert anis
        illustration: string // vignette illustrative
    }[]
}

export type ProductIllustration = {
    src: string
    meta: string[]
}