'use client';

import { SlideBaseProps, SlideBasePropsDefaults } from "@/types/Slide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useReducer } from "react";
import styles from "./GridListModel.module.scss";

/**
 * STATE REDUCER
 */
function itemReducer(state:GridCardProps[], action:{ type:string, payload?:any }) {
    switch(true) {
        case (action.type === "add one"): 
            return state.map(item => {
                if(item.id === action.payload) {
                    item.quantity = (item?.quantity ?? 0) + 1;
                }

                return item;
            });
        case (action.type === "remove one"): 
        return state.map(item => {
            if(item.id === action.payload) item.quantity = (item?.quantity ?? 0) - 1;

            return item;
        });
        default:
            throw Error('Action inconnue');
    }
}

/**
 * STATE INITIALIZER
 */
const stateInitBuilder = (config:GridListModelProps) => {
    const cardItems:GridCardProps[] = config.items.map(item => {
        let selectionType:'select'|'qt-cart'|'mono-cart' = (config.slideConfig.quantityChoices && config.slideConfig.hasCart)
            ? 'qt-cart'
            : (!config.slideConfig.quantityChoices && config.slideConfig.hasCart)
            ? 'mono-cart'
            : 'select';

        return {
            id: item.id,
            title: item.title, 
            vignette: item.vignette, 
            selectionType, 
            quantity: (item.initialQuantity) ? item.initialQuantity : 0,
            dispatchCb: () => {}
        }
    });

    return cardItems;
}

/**
 * GRID
 */
type GridListModelProps = SlideBaseProps & {
    slideConfig: {
        mandatoryChoice: boolean                                                                // skippable
        multipleChoices: boolean                                                                // mono ou multi choix
        hasCart: boolean                                                                        // selection visible dans panier
        quantityChoices: boolean                                                                // possibilité de choisir la quantité des items
    },
    items: {
        id: string
        title: string
        vignette: string
        initialQuantity: number
    }[]
    // filters
    // compatibility rules
}

export default function GridListModel(props:GridListModelProps) {
    const _props = Object.assign({}, SlideBasePropsDefaults, props);
    const [_items, dispatchItemUpdate] = useReducer(itemReducer, _props, stateInitBuilder);
    const itemSelectionCount:number = _items.reduce((acc, curr) => ((curr?.quantity ?? 0) > 0) ? acc + 1 : acc, 0);
    const isNextDisabled = (_props.slideConfig.mandatoryChoice && itemSelectionCount === 0);

    return (
        <article className={ styles["grm-SlideWrapper"] }>
            <header className={ styles["grm-Header"] }>
                <button className={ styles["grm-Header-BackBtn"] } onClick={ () => { history.back() } }><FontAwesomeIcon color="#ffffff" icon="arrow-left" size="xl" /></button>
                <h1 className={ styles["grm-Header-Title"] }>{ _props.slideTitle }</h1>
                { _props.slideConfig.hasCart && <button onClick={ () => alert('todo') } className={ styles["grm-Header-CartBtn"] }>Votre sélection <span>{ itemSelectionCount }</span></button> }
                <button onClick={ _props.slideNextCb } disabled={ isNextDisabled } className={ styles["grm-Header-NextBtn"] }>{ _props.slideNextLabel }</button>
            </header>
            <menu className={ styles["grm-ContentGrid"] }>
                { _items.map(item => {
                    const { id, dispatchCb, ...rest } = item;
                    return <GridCard key={ id } id={ id } {...rest} dispatchCb={ dispatchItemUpdate } />
                })}
            </menu>
        </article>
    )
}

/**
 * CARDS
 */
type GridCardProps = {
    id: string
    title: string
    vignette: string
    selectionType: 'select'|'qt-cart'|'mono-cart'
    dispatchCb: Function
    detailsCb?: Function                                                                        // leave undefined if no details available
    quantity?: number                                                                           // quantity selected (qt-cart) otherwise either 0 or 1 
}

function GridCard(item:GridCardProps) {
    const { id, title, vignette, selectionType, detailsCb, quantity, dispatchCb } = item;
    const isSelected = (typeof quantity === 'number' && quantity >= 1);
    const detailLink = (detailsCb !== undefined) 
        ? <button onClick={ () => detailsCb() } className={ styles["grc-Card-DetailLink"] }><FontAwesomeIcon color="#004770" icon="magnifying-glass" /></button>
        : null;

    function callToActionSolver() {
        switch(true) {
            case (!isSelected && selectionType === 'select'): return <button onClick={ () => dispatchCb({ type: "add one", payload: id }) } className={ styles["grc-Card-Cta"] }>Sélectionner</button>;
            case (isSelected && selectionType === 'select'): return <button onClick={ () => dispatchCb({ type: "remove one", payload: id }) } className={ styles["grc-Card-Cta"] }>Désélectionner</button>;
            case (!isSelected && selectionType === 'qt-cart'):
            case (!isSelected && selectionType === 'mono-cart'): return <button onClick={ () => dispatchCb({ type: "add one", payload: id }) } className={ styles["grc-Card-Cta"] }>+</button>;
            case (isSelected && selectionType === 'qt-cart'): return <div className={ styles["grc-Card-CtaQtSelector"] }><button onClick={ () => dispatchCb({ type: "remove one", payload: id }) } className={ styles["grc-Card-CtaDecrement"] }>-</button><span className={ styles["grc-Card-CtaCount"] }>{ quantity }</span><button onClick={ () => dispatchCb({ type: "add one", payload: id }) } className={ styles["grc-Card-CtaIncrement"] }>+</button></div>;
            case (isSelected && selectionType === 'mono-cart'): return <button onClick={ () => dispatchCb({ type: "remove one", payload: id }) } className={ styles["grc-Card-CtaRemoveFromCart"] }><FontAwesomeIcon color="#004770" icon="trash" /></button>;
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