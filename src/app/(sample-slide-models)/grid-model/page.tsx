import GridModel, { GridCard } from "@/slide-components/GridModel";
import { Metadata } from "next";

export const metadata:Metadata = {
    title: 'modèle : grille de produits'
}

export default function FreeContentSample() {
    return (
        <main>
            <GridModel slideTitle="Choix de la forme et modèle">
                <GridCard title="product 1" vignette="https://picsum.photos/600" selectionType="mono-select" detail="none" />
                <GridCard title="product 2" vignette="https://picsum.photos/600" selectionType="mono-select" detail="carousel" />
                <GridCard title="product 3" vignette="https://picsum.photos/600" selectionType="mono-select" detail="none" />
                <GridCard title="product 4" vignette="https://picsum.photos/600" selectionType="mono-select" detail="free-content" />
                <GridCard title="Un nom de produit vraiment très long pour voir ce que ça donne" vignette="https://picsum.photos/600" selectionType="mono-select" detail="none" />
                <GridCard title="product 6" vignette="https://picsum.photos/600" selectionType="mono-select" detail="none" />
                <GridCard title="product 7" vignette="https://picsum.photos/600" selectionType="mono-select" detail="none" />
                <GridCard title="product 8" vignette="https://picsum.photos/600" selectionType="mono-select" detail="none" />
            </GridModel>
        </main>
    )
}
