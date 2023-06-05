'use client';

import GridModel, { GridCard } from "./GridModel";

type GridSlideProps = {
    slideTitle:string
    mandatoryChoice: boolean                                                               // skippable
    singularChoice: boolean                                                                // mono ou multi choix
    hasCart: boolean                                                                       // multi choix avec quantité
    // filters
    // compatibility rules
    choices: { title:string, vignette:string, detailsCb?: Function, initialQt?: number, qtEnabled?: boolean }[] // liste de choix ordonnés
}

export default function GridSlide({ slideTitle, mandatoryChoice, singularChoice, hasCart, choices }:GridSlideProps) {
    const findSelectType = selectionTypeResolver(singularChoice, hasCart);

    return (
        <GridModel slideTitle={ slideTitle }>
            { choices.map(choice => {
                const qtEnabled = (choice.qtEnabled) ? choice.qtEnabled : false;
                const cardProps = {
                    key: choice.title,
                    title: choice.title, 
                    vignette: choice.vignette, 
                    selectionType: findSelectType(qtEnabled), 
                    quantity: (choice.initialQt) ? choice.initialQt : 0,
                    qtEnabled
                }

                return <GridCard { ...cardProps as any }/>
            })}
        </GridModel>
    );
}

// UTILS
const selectionTypeResolver = (singularChoice: boolean, hasCart: boolean) => (qtEnabled:boolean) => {
    switch(true) {
        case (!singularChoice && hasCart && qtEnabled):                                         // plusieurs choix permis, Qt variable, panier affiché
        case (singularChoice && hasCart && qtEnabled): return 'qt-cart';                        // un seul choix permis, Qt variable, panier affiché
        case (!singularChoice && hasCart && !qtEnabled):                                        // plusieurs choix permis, Qt max 1, panier affiché
        case (singularChoice && hasCart && !qtEnabled): return 'mono-cart';                     // un seul choix permis, Qt max 1, panier affiché:

        case (!singularChoice && !hasCart && qtEnabled): throw new Error('plusieurs choix permis, Qt variable, pas de panier - ERROR');
        case (singularChoice && !hasCart && qtEnabled): throw new Error('un seul choix permis, Qt variable, pas de panier - ERROR');

        case (!singularChoice && !hasCart && !qtEnabled):                                        // plusieurs choix permis, Qt max 1, pas de panier
        case (singularChoice && !hasCart && !qtEnabled):                                         // un seul choix permis, Qt max 1, pas de panier
        default:
            return 'select';
    }
}