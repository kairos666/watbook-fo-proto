export type ConfigV0 = {
    id: string,
    SAP_id: string,
    market: string,
    country: string
    rootItem: {
        id: string
        key: string
        pricing: 'only a mock'
        variantConditions: 'only a mock'
        subItems: 'only a mock'
        characteristics: {
            id: string
            values: {
                value: string
                author?: string
            }[]
            possibleValues: 'only a mock'
        }[]
    }
}

export type FlatConfigV0 = {
    id: string,
    SAP_id: string,
    market: string,
    country: string
    rootItem: {
        id: string
        key: string
        pricing: 'only a mock'
        variantConditions: 'only a mock'
        subItems: 'only a mock'
        characteristics: {
            [caracId:string]: string
        }
    }
}