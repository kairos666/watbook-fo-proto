'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SyntheticEvent } from 'react';
import styles from "./FreeContentModel.module.scss";

type FreeContentModelProps = {
    slideTitle: string
    slideIllu: string
    children: React.ReactNode
    customNextLabel?: string
    nextCb?: Function
}

export default function FreeContentModel({ children, slideTitle, slideIllu, customNextLabel, nextCb }:FreeContentModelProps) {
    const handleNext = (evt:SyntheticEvent) => {
        evt.preventDefault();
        if(nextCb) {
            nextCb();
        } else {
            alert("slide suivant - bouchonné");
        }
    }

    return (
        <article className={ styles["fcm-SlideWrapper"] }>
            <header className={ styles["fcm-Header"] }>
                <button className={ styles["fcm-Header-BackBtn"] } onClick={ () => { history.back() } }><FontAwesomeIcon color="#ffffff" icon="arrow-left" size="xl" /></button>
                <h1 className={ styles["fcm-Header-Title"] }>{ slideTitle }</h1>
                <button onClick={ handleNext } className={ styles["fcm-Header-NextBtn"] }>{ (customNextLabel) ? customNextLabel : 'Suivant' }</button>
            </header>
            <figure className={ styles["fcm-Content"] }>
                <img className={ styles["fcm-Content-SlideIllustration"] } alt="slide main illustration" src={ slideIllu } />
                <figcaption className={ styles["fcm-Content-DataContainer"] }>
                    { children }
                </figcaption>
            </figure>
        </article>
    );
}