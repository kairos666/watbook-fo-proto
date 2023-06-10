import PoolBuilder from "@/mock-data/PoolBuilder";
import GridListModel, { BaseFilter } from "@/slide-components/grid/GridListModel";
import { Metadata } from "next";

// MOCK DATA SERVER FETCH
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

export const metadata:Metadata = {
    title: 'modèle : grille de produits'
}

export default async function GridSample() {
    const mockPools = await getMockPools();

    const props = {
        slideTitle: "Choix de la forme et modèle",
        slideConfig: {
            mandatoryChoice: true,
            multipleChoices: false,
            hasCart: true,
            quantityChoices: true,
            filters: <BaseFilter hasAllFilter groupBy="forme" />
        },
        items: mockPools
    }

    return (
        <main>
            <GridListModel {...props}/>
        </main>
    )
}
