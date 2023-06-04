'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { SyntheticEvent } from 'react';
import styles from "./GridModel.module.scss";

type GridModelProps = {
    slideTitle: string
    children: React.ReactNode
    customNextLabel?: string
    nextCb?: Function
}

export default function GridModel({ children, slideTitle, customNextLabel, nextCb }:GridModelProps) {
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
    selectionType: 'mono-select'|'qt-select'
    detail: 'none'|'carousel'|'free-content'
}

export function GridCard({ title, vignette, selectionType, detail }:GridCardProps) {
    const detailLink = (detail === 'none') ? null : <Link href="#" className={ styles["grc-Card-DetailLink"] }><FontAwesomeIcon color="#004770" icon="magnifying-glass" /></Link>;
    const cta = <button className={ styles["grc-Card-Cta"] }>Sélectionner</button>;

    return (
        <section className={ styles["grc-Card"] }>
            <header className={ styles["grc-Card-Header"] }>{ detailLink }</header>
            <img className={ styles["grc-Card-Vignette"] } src={ vignette } alt="product image" />
            <footer className={ styles["grc-Card-Description"] }>
                <span className={ styles["grc-Card-Description-Label"] }>{ title }</span>
                { cta }
            </footer>
        </section>
    );
}