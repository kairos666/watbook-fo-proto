'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import styles from "./PostulateModel.module.scss";

type PostulateModelProps = {
    slideTitle: string
    slideIllu: string
    projectTitle: string
    checks: React.ReactNode[]
    customNextLabel?: string
    nextCb?: Function
}

export default function PostulateModel({ slideTitle, slideIllu, projectTitle, checks, customNextLabel, nextCb }:PostulateModelProps) {
    const formRef = useRef(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const handleChange = () => {
        if(formRef === null) return;

        setIsFormValid(((formRef as any).current as HTMLFormElement).checkValidity());
    }
    const handleSubmit = (evt:any) => {
        evt.preventDefault();
        if(nextCb) {
            nextCb();
        } else {
            alert("slide suivant - bouchonné");
        }
    }

    return (
        <Form ref={ formRef } onSubmit={ handleSubmit }>
            <article className={ styles["posm-SlideWrapper"] }>
                <header className={ styles["posm-Header"] }>
                    <button className={ styles["posm-Header-BackBtn"] } onClick={ () => { history.back() } }><FontAwesomeIcon color="#ffffff" icon="arrow-left" size="xl" /></button>
                    <h1 className={ styles["posm-Header-Title"] }>{ slideTitle }</h1>
                    <button type="submit" disabled={ !isFormValid } className={ styles["posm-Header-NextBtn"] }>{ (customNextLabel) ? customNextLabel : 'Suivant' }</button>
                </header>
                <figure className={ styles["posm-Content"] }>
                    <img className={ styles["posm-Content-SlideIllustration"] } alt="slide main illustration" src={ slideIllu } />
                    <figcaption className={ styles["posm-Content-DataContainer"] }>
                        <h2 className={ styles["posm-Content-SubTitle"] }>{ projectTitle }</h2>
                        
                            <ul className={ styles["posm-Content-CheckList"] }>
                                { checks.map((check, index) => <li key={ index }><Form.Check type="switch" id={ `check-${ index }` } label={ check } required onChange={ handleChange }/></li>) }
                            </ul>
                    </figcaption>
                </figure>
            </article>
        </Form>
    );
}