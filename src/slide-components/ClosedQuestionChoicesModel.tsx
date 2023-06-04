'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SyntheticEvent, useRef, useState } from 'react';
import styles from "./ClosedQuestionChoicesModel.module.scss";

type ClosedQuestionChoicesModelProps = {
    slideTitle: string
    slideIllu: string
    choices: React.ReactNode[]
    options?: {
        isRequired?: boolean
        isMultiple?: boolean
    }
    customNextLabel?: string
    nextCb?: Function
}

export default function ClosedQuestionChoicesModel({ slideTitle, slideIllu, options, choices, customNextLabel, nextCb }:ClosedQuestionChoicesModelProps) {
    const _options = Object.assign({ isRequired: false, isMultiple: false }, options);
    const formRef = useRef(null);
    const [isFormValid, setIsFormValid] = useState(!_options.isRequired);
    const handleChange = (evt:SyntheticEvent) => {
        if(formRef.current === null) return;
        const inputs:HTMLInputElement[] = Array.from((formRef.current as HTMLFormElement).querySelectorAll('input')) ?? [];

        if(!_options.isMultiple && (evt.target as HTMLInputElement).checked) {
            // one choice allowed max (unselect others)
            const otherInputs = inputs.filter(input => input !== evt.target);
            otherInputs.forEach(input => { input.checked = false });
        }

        if(_options.isRequired) {
            // valid if at least one choice
            setIsFormValid(inputs.some(input => input.checked));
        } else {
            // always valid (can be skipped)
            setIsFormValid(true);
        }
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
        <form ref={ formRef } onSubmit={ handleSubmit }>
            <article className={ styles["cqc-SlideWrapper"] }>
                <header className={ styles["cqc-Header"] }>
                    <button className={ styles["cqc-Header-BackBtn"] } onClick={ () => { history.back() } }><FontAwesomeIcon color="#ffffff" icon="arrow-left" size="xl" /></button>
                    <h1 className={ styles["cqc-Header-Title"] }>{ slideTitle }</h1>
                    <button type="submit" disabled={ !isFormValid } className={ styles["cqc-Header-NextBtn"] }>{ (customNextLabel) ? customNextLabel : 'Suivant' }</button>
                </header>
                <figure className={ styles["cqc-Content"] }>
                    <img className={ styles["cqc-Content-SlideIllustration"] } alt="slide main illustration" src={ slideIllu } />
                    <figcaption className={ styles["cqc-Content-DataContainer"] }>
                        { choices.map((choice, index) => <label className={ styles["cqc-AnswerCheckbox"] } key={ index }>{ choice }<input id={ `choice-${index}` } type="checkbox" onChange={ handleChange } /></label>) }
                    </figcaption>
                </figure>
            </article>
        </form>
    );
}