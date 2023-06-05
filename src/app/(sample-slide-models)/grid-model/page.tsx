'use client';

import PoolBuilder from "@/mock-data/PoolBuilder";
import GridSlide from "@/slide-components/grid/GridSlide";
import { Metadata } from "next";

export const metadata:Metadata = {
    title: 'modèle : grille de produits'
}

export default function GridSample() {
    const mockPools = new Array(12)
        .fill(null)
        .map(() => PoolBuilder())
        .map(pool => ({
            title: pool.libelle,
            vignette: pool.illustrations[0].src,
            // initialQt: 1,
            // qtEnabled: true
        }));

    const props = {
        slideTitle: "Choix de la forme et modèle",
        mandatoryChoice: true,
        singularChoice: true,
        hasCart: false,
        choices: mockPools
    }

    return (
        <main>
            <GridSlide {...props} />
        </main>
    )
}
