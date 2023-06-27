import groupBy from "lodash/groupBy";

export type TradObj = {
    id: string
    translation: { language:string, name: string, description?: string }[]
}
export type ProductObj = TradObj & {
    characteristicGroups: TradObj[]
}
export type CaracteristicsObj = TradObj & {
    possibleValues?: TradObj[]
}

export type TradOutput = {
    id: string
    path: string
    translations: {
        EN: null|string 
        FR: null|string 
        DE: null|string 
        ES: null|string
    }
}

/**
 * UTILS
 */
 function tradObjectExtractor(tradObj:TradObj, partialPath?:string):TradOutput {
    const formattedTranslations = tradObj.translation.reduce((acc, curr) => {
        acc[curr.language.toUpperCase()] = curr.name;

        return acc;
    }, ({ EN: null, FR: null, DE: null, ES: null } as any));

    return {
        id: tradObj.id,
        path: (partialPath) ? `${partialPath}.${tradObj.id}` : tradObj.id,
        translations: formattedTranslations
    }
}

function productRecursor(products:ProductObj[]):TradOutput[] {
    const results:TradOutput[] = [];

    products.forEach(prodItem => {
        // root extraction
        results.push(tradObjectExtractor(prodItem, 'product'));

        // cara groups
        if(prodItem.characteristicGroups) {
            prodItem.characteristicGroups.forEach(cGroupItem => {
                results.push(tradObjectExtractor(cGroupItem, `product.${prodItem.id}.characteristicGroups`));
            });
        }
    });

    return results;
}

function caracteristicsRecursor(caracteristics:CaracteristicsObj[]):TradOutput[] {
    const results:TradOutput[] = [];

    caracteristics.forEach(caracItem => {
        // root extraction
        results.push(tradObjectExtractor(caracItem, 'caracteristic'));

        // possible values
        if(caracItem.possibleValues) {
            caracItem.possibleValues.forEach(pValueItem => {
                results.push(tradObjectExtractor(pValueItem, `caracteristic.${caracItem.id}.possibleValues`));
            });
        }
    });

    return results;
}

function classesRecursor(classes:TradObj[]):TradOutput[] {
    return classes.map(classItem => tradObjectExtractor(classItem, "classes"));
}

/**
 * OUTPUT analyzer
 */
export function tradOutputAnalyzer(trads:TradOutput[]) {
    const entriesCount = trads.length;
    const tradsGroupedById = groupBy(trads, 'id');

    return {
        entriesCount,
        uniqueIdEntriesCount: Object.keys(tradsGroupedById).length,
        duplicates: Object.entries(tradsGroupedById).filter(entry => entry[1].length > 1)
    }
}

/**
 * JSON FORMATER UTILS
 */
export function JSONTradOutput(trads:TradOutput[], targetLanguage:"EN"|"FR"|"DE"|"ES") {
    return trads.map(tradItem => ({ key: tradItem.path, value: tradItem.translations[targetLanguage] }));
}


/**
 * TRAD FULL PARSER
 */
export function configToTradOutput(config: { products: ProductObj[], classes: TradObj[], characteristics: CaracteristicsObj[] }):TradOutput[] {
    return [
        ...productRecursor(config.products),
        ...caracteristicsRecursor(config.characteristics),
        ...classesRecursor(config.classes)
    ]
}