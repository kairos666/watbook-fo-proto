'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { SyntheticEvent } from 'react';
import styles from "./GridModel.module.scss";

type GridModelProps = {
    slideTitle: string
    children: React.ReactNode
    customNextLabel?: string        // apply different label on "suivant"
    nextCb?: Function
    cart?: {                        // if defined show cart button
        selectionCount: number
        cartCb: Function
    } 
}

export default function GridModel({ children, slideTitle, customNextLabel, nextCb, cart }:GridModelProps) {
    const handleNext = (evt:SyntheticEvent) => {
        evt.preventDefault();
        if(nextCb) {
            nextCb();
        } else {
            alert("slide suivant - bouchonné");
        }
    }

    return (
        <article className={ styles["grm-SlideWrapper"] }>
            <header className={ styles["grm-Header"] }>
                <button className={ styles["grm-Header-BackBtn"] } onClick={ () => { history.back() } }><FontAwesomeIcon color="#ffffff" icon="arrow-left" size="xl" /></button>
                <h1 className={ styles["grm-Header-Title"] }>{ slideTitle }</h1>
                { cart && <button onClick={ () => cart.cartCb() } className={ styles["grm-Header-CartBtn"] }>Votre sélection <span>{ cart.selectionCount }</span></button> }
                <button onClick={ handleNext } className={ styles["grm-Header-NextBtn"] }>{ (customNextLabel) ? customNextLabel : 'Suivant' }</button>
            </header>
            <menu className={ styles["grm-ContentGrid"] }>
                { children }
            </menu>
        </article>
    );
}

type GridCardProps = {
    title: string
    vignette: string
    selectionType: 'select'|'qt-cart'|'mono-cart'
    detailsCb?: Function
    quantity?: number // if only selection 0 (not selected) or 1 selected
}

export function GridCard({ title, vignette, selectionType, detailsCb, quantity }:GridCardProps) {
    const isSelected = (typeof quantity === 'number' && quantity >= 1);
    const detailLink = (detailsCb !== undefined) 
        ? <button onClick={ () => detailsCb() } className={ styles["grc-Card-DetailLink"] }><FontAwesomeIcon color="#004770" icon="magnifying-glass" /></button>
        : null;

    function callToActionSolver() {
        switch(true) {
            case (!isSelected && selectionType === 'select'): return <button className={ styles["grc-Card-Cta"] }>Sélectionner</button>;
            case (isSelected && selectionType === 'select'): return <button className={ styles["grc-Card-Cta"] }>Désélectionner</button>;
            case (!isSelected && selectionType === 'qt-cart'):
            case (!isSelected && selectionType === 'mono-cart'): return <button className={ styles["grc-Card-Cta"] }>Ajouter au panier</button>;
            case (isSelected && selectionType === 'qt-cart'): return <div className={ styles["grc-Card-CtaQtSelector"] }><button className={ styles["grc-Card-CtaDecrement"] }>-</button><span className={ styles["grc-Card-CtaCount"] }>{ (quantity) ? quantity : 0 }</span><button className={ styles["grc-Card-CtaIncrement"] }>+</button></div>;
            case (isSelected && selectionType === 'mono-cart'): return <button className={ styles["grc-Card-CtaRemoveFromCart"] }><FontAwesomeIcon color="#004770" icon="trash" /></button>;
        }
    }

    function cardClassesSolver() {
        return (isSelected) 
            ? `${ styles["grc-Card"] } ${ styles["grc-Card--selected"] }`
            : styles["grc-Card"];
    }

    return (
        <section className={ cardClassesSolver() }>
            <header className={ styles["grc-Card-Header"] }>{ detailLink }</header>
            <img className={ styles["grc-Card-Vignette"] } src={ vignette } alt="product image" />
            <footer className={ styles["grc-Card-Description"] }>
                <span className={ styles["grc-Card-Description-Label"] }>{ title }</span>
                { callToActionSolver() }
            </footer>
        </section>
    );
}