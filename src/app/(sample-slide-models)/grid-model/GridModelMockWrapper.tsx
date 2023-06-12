'use client';

import PoolBuilder from "@/mock-data/PoolBuilder";
import GridListModel, { BaseFilter } from "@/slide-components/grid/GridListModel";
import { fakerFR as faker } from '@faker-js/faker';

// MOCK DATA SERVER FETCH - POOLS
function getMockPools(count:number = 12) {
    return new Array(count)
        .fill(null)
        .map(() => PoolBuilder())
        .map(pool => ({
            id: pool.id,
            title: pool.libelle,
            forme: pool.forme,
            vignette: pool.illustrations[0].src,
            initialQuantity: 0
        }));
}

// MOCK DATA SERVER FETCH - INCOMPATIBILITIES (each product has an incomppatibility list)
function getMockIncompatibilities(itemIds:string[]):{ [key:string]: string[] } {
    const incompatMap = itemIds.reduce((map, itemId) => {
        map[itemId] = [];
        return map;
    }, ({} as { [key:string]: string[] }));

    // assign random incompats
    const incompatSeeds = faker.helpers.arrayElements(itemIds, { min:1, max: 5 });
    incompatSeeds.forEach(incompatSeed => {
        const incompatTargets = faker.helpers.arrayElements(itemIds.filter(src => (src !== incompatSeed)), { min:1, max: 4 });

        incompatMap[incompatSeed].push(...incompatTargets);
        incompatTargets.forEach(target => {
            incompatMap[target].push(incompatSeed);
        });
    });

    // clean duplicates
    Object.entries(incompatMap).forEach(([property, value]) => { incompatMap[property] = Array.from(new Set(value)) });

    return incompatMap;
}

type GridModelMockWrapperProps = {
    usecase: 'unique-choice-mandatory'|
             'unique-choice-filters-customnext'|
             'multiple-choices-filters-mandatory'|
             'multiple-choices-filters-cart'|
             'multiple-choices-filters-cart-quantity-mandatory'|
             'multiple-choices-filters-cart-compat'|
             'multiple-choices-nofilters-cart-quantity-compat-mandatory'
}

export default function GridModelMockWrapper({ usecase }:GridModelMockWrapperProps) {
    let mockCompatMap:any = null;
    let mockPools:any = null;
    let props:any = null;
    switch(usecase) {
        case 'unique-choice-mandatory':
            mockPools = getMockPools();

            props = {
                slideTitle: "Choix de la forme et modèle",
                slideConfig: {
                    mandatoryChoice: true,
                    multipleChoices: false,
                    hasCart: false,
                    quantityChoices: false,
                    filters: undefined,
                    incompatibilityMap: undefined
                },
                items: mockPools
            }
            break;
        case 'unique-choice-filters-customnext':
            mockPools = getMockPools(5);

            props = {
                slideTitle: "Choix du profil de fond",
                slideConfig: {
                    mandatoryChoice: false,
                    multipleChoices: false,
                    hasCart: false,
                    quantityChoices: false,
                    filters: <BaseFilter hasAllFilter groupBy="forme" />,
                    incompatibilityMap: undefined
                },
                items: mockPools,
                slideNextLabel: 'Je veux une piscine sans fond'
            }
            break;
        case 'multiple-choices-filters-mandatory':
            mockPools = getMockPools();

            props = {
                slideTitle: "Choix de margelles",
                slideConfig: {
                    mandatoryChoice: true,
                    multipleChoices: true,
                    hasCart: false,
                    quantityChoices: false,
                    filters: <BaseFilter hasAllFilter groupBy="forme" />,
                    incompatibilityMap: undefined
                },
                items: mockPools
            }
            break;
        case 'multiple-choices-filters-cart':
            mockPools = getMockPools(8);

            props = {
                slideTitle: "Choix d'éclairage(s)",
                slideConfig: {
                    mandatoryChoice: false,
                    multipleChoices: true,
                    hasCart: true,
                    quantityChoices: false,
                    filters: <BaseFilter hasAllFilter groupBy="forme" />,
                    incompatibilityMap: undefined
                },
                items: mockPools
            }
            break;
        case 'multiple-choices-filters-cart-quantity-mandatory':
            mockPools = getMockPools(40);

            props = {
                slideTitle: "Choix des canards en plastique",
                slideConfig: {
                    mandatoryChoice: true,
                    multipleChoices: true,
                    hasCart: true,
                    quantityChoices: true,
                    filters: <BaseFilter hasAllFilter groupBy="forme" />,
                    incompatibilityMap: undefined
                },
                items: mockPools
            }
            break;
        case 'multiple-choices-filters-cart-compat':
            mockPools = getMockPools(10);
            mockCompatMap = getMockIncompatibilities(mockPools.map((pool:any) => pool.id));

            props = {
                slideTitle: "Choix incompatibles",
                slideConfig: {
                    mandatoryChoice: false,
                    multipleChoices: true,
                    hasCart: true,
                    quantityChoices: false,
                    filters: <BaseFilter hasAllFilter groupBy="forme" />,
                    incompatibilityMap: mockCompatMap
                },
                items: mockPools
            }
            break;
        case 'multiple-choices-nofilters-cart-quantity-compat-mandatory':
            mockPools = getMockPools();
            mockCompatMap = getMockIncompatibilities(mockPools.map((pool:any) => pool.id));

            props = {
                slideTitle: "Autres incompatibilitées",
                slideConfig: {
                    mandatoryChoice: true,
                    multipleChoices: true,
                    hasCart: true,
                    quantityChoices: true,
                    filters: undefined,
                    incompatibilityMap: mockCompatMap
                },
                items: mockPools
            }
            break;

        default:
            alert(`usecase inconnu : ${ usecase }`);
    }

    return (
        <main>
            <GridListModel {...props}/>
        </main>
    )
}
