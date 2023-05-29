'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from "./PostulateModel.module.scss";

type PostulateModelProps = {}

export default function PostulateModel({}:PostulateModelProps) {
    return (
        <article className={ styles["posm-SlideWrapper"] }>
            <header className={ styles["posm-Header"] }>
                <button className={ styles["posm-Header-BackBtn"] } onClick={ () => { history.back() } }><FontAwesomeIcon color="#ffffff" icon="arrow-left" size="xl" /></button>
                <h1 className={ styles["posm-Header-Title"] }>Résumons ensemble...</h1>
                <button className={ styles["posm-Header-NextBtn"] } onClick={ () => { alert("bouchonné") } }>Suivant</button>
            </header>
            <figure className={ styles["posm-Content"] }>
                <img className={ styles["posm-Content-SlideIllustration"] } alt="slide main illustration" src="/samples/top-view-pool.png" />
                <figcaption className={ styles["posm-Content-DataContainer"] }>
                    <h2 className={ styles["posm-Content-SubTitle"] }>Projet de Mr Dubriand</h2>
                    <ul className={ styles["posm-Content-CheckList"] }>
                        <li><FontAwesomeIcon color="#007AC8" icon="check" size="2xl" />Modèle <b>Barbara</b>. Taille : 7m à 7,90m x 3m à 3,90m</li>
                        <li><FontAwesomeIcon color="#007AC8" icon="check" size="2xl" />En 72 mensualités de confort : <b>694 €</b></li>
                        <li><FontAwesomeIcon color="#007AC8" icon="check" size="2xl" />Modèle <b>Orbis.</b> Coloris : blanc</li>
                        <li><FontAwesomeIcon color="#007AC8" icon="check" size="2xl" />Date du 1er plongeon <b>20 avril 2024</b></li>
                        <li><FontAwesomeIcon color="#007AC8" icon="check" size="2xl" />Ligne d'équipement : <b>Top</b></li>
                        <li><FontAwesomeIcon color="#007AC8" icon="check" size="2xl" />Date démarrage des travaux : <b>20 août 2024</b></li>
                        <li><FontAwesomeIcon color="#007AC8" icon="check" size="2xl" />Budget de <b>50 000 €</b></li>
                    </ul>
                </figcaption>
            </figure>
        </article>
    );
}