'use client';

import PoolBuilder from "@/mock-data/PoolBuilder";
import GridListModel from "@/slide-components/grid/GridListModel";
import { Metadata } from "next";

export const metadata:Metadata = {
    title: 'modèle : grille de produits'
}

export default function GridSample() {
    const mockPools = new Array(12)
        .fill(null)
        .map(() => PoolBuilder())
        .map(pool => ({
            id: pool.id,
            title: pool.libelle,
            vignette: pool.illustrations[0].src,
            initialQuantity: 0
        }));

    const props = {
        slideTitle: "Choix de la forme et modèle",
        slideConfig: {
            mandatoryChoice: true,
            multipleChoices: false,
            hasCart: true,
            quantityChoices: true
        },
        items: mockPools
    }

    return (
        <main>
            <GridListModel {...props} />
        </main>
    )
}