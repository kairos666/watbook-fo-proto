import { Metadata } from "next";
import { PageProps } from "../../../../.next/types/app/page";
import dynamic from 'next/dynamic';

const GridModelMockWrapper = dynamic(() => import("./GridModelMockWrapper"), { ssr: false });

export const metadata:Metadata = {
    title: 'modèle : grille de produits'
}

export default async function GridSample({ searchParams }:PageProps) {
    const usecaseParam = (searchParams.usecase) ? searchParams.usecase : 'unique-choice-mandatory';

    return (
        <main>
            <GridModelMockWrapper usecase={ usecaseParam } />
        </main>
    )
}
