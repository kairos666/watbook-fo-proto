import PoolBuilder from "@/mock-data/PoolBuilder";
import GridListModel, { BaseFilter } from "@/slide-components/grid/GridListModel";
import { fakerFR as faker } from '@faker-js/faker';
import { Metadata } from "next";

// MOCK DATA SERVER FETCH - POOLS
async function getMockPools() {
    return new Array(12)
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
async function getMockIncompatibilities(itemIds:string[]):Promise<{ [key:string]: string[] }> {
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

export const metadata:Metadata = {
    title: 'modèle : grille de produits'
}

export default async function GridSample() {
    const mockPools = await getMockPools();
    const mockCompatMap = await getMockIncompatibilities(mockPools.map(pool => pool.id));

    const props = {
        slideTitle: "Choix de la forme et modèle",
        slideConfig: {
            mandatoryChoice: true,
            multipleChoices: false,
            hasCart: false,
            quantityChoices: false,
            filters: <BaseFilter hasAllFilter groupBy="forme" />,
            incompatibilityMap: mockCompatMap
        },
        items: mockPools
    }

    return (
        <main>
            <GridListModel {...props}/>
        </main>
    )
}
