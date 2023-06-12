'use client';

import { SlideBaseProps, SlideBasePropsDefaults } from "@/types/Slide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import LodashGroupBy from "lodash/groupBy";
import { produce } from "immer";
import styles from "./GridListModel.module.scss";
import { Modal } from "react-bootstrap";

/**
 * STATE REDUCER
 */
type GridState = {
    items: GridCardProps[]
    filter: Function
    modal: null|'cart'|'incompatible'
    incompatibilityMap: undefined|{ [key:string]: string[] }
    isMultiple: boolean
}
function itemReducer(state:GridState, action:{ type:string, payload?:any }) {
    switch(true) {
        case (action.type === "add one" && state.isMultiple): 
            return produce(state, draft => {
                // select/add product
                draft.items = draft.items.map(item => {
                    if(item.id === action.payload) {
                        item.quantity = (item?.quantity ?? 0) + 1;
                    }
    
                    return item;
                })

                // update compatibility state
                const incompatibilitySolver = productCompatibilitySolver(draft.items.map(item => ({ ...item, quantity: (item.quantity) ? item.quantity : 0 })), draft.incompatibilityMap);
                draft.items = draft.items.map(item => ({...item, isIncompatible: incompatibilitySolver(item.id)}));
            });

        case (action.type === "add one" && !state.isMultiple):
            return produce(state, draft => {
                // toggle/select product
                draft.items = draft.items.map(item => {
                    if(item.id === action.payload) {
                        item.quantity = (item?.quantity ?? 0) + 1;
                    } else {
                        item.quantity = 0;
                    }
    
                    return item;
                })
            });
        
        case (action.type === "remove one"):
            return produce(state, draft => {
                draft.items = draft.items.map(item => {
                    if(item.id === action.payload) item.quantity = (item?.quantity ?? 0) - 1;
    
                    return item;
                });

                // update compatibility state
                const incompatibilitySolver = productCompatibilitySolver(draft.items.map(item => ({ ...item, quantity: (item.quantity) ? item.quantity : 0 })), draft.incompatibilityMap);
                draft.items = draft.items.map(item => ({...item, isIncompatible: incompatibilitySolver(item.id)}));
            });

        case (action.type === "filter update"):
            return produce(state, draft => {
                draft.filter = action.payload;
            });

        case (action.type === "show cart"):
            return produce(state, draft => {
                draft.modal = "cart";
            });

        case (action.type === "show incompatible modal"):
            return produce(state, draft => {
                draft.modal = "incompatible";
            });

        case (action.type === "hide cart"):
        case (action.type === "hide incompatible modal"):
        case (action.type === "hide any modal"):
            return produce(state, draft => {
                draft.modal = null;
            });

        default:
            throw Error('Action inconnue');
    }
}

/**
 * STATE INITIALIZER
 */
const stateInitBuilder = (config:GridListModelProps) => {
    const incompatibilitySolver = productCompatibilitySolver(config.items.map(item => ({ ...item, quantity: (item.initialQuantity) ? item.initialQuantity : 0 })), config.slideConfig.incompatibilityMap);
    const cardItems:GridCardProps[] = config.items.map(item => {
        const selectionType:'select'|'qt-cart'|'mono-cart' = (config.slideConfig.quantityChoices && config.slideConfig.hasCart)
            ? 'qt-cart'
            : (!config.slideConfig.quantityChoices && config.slideConfig.hasCart)
            ? 'mono-cart'
            : 'select';

        const isIncompatible = incompatibilitySolver(item.id);

        return {
            ...item, 
            selectionType, 
            quantity: (item.initialQuantity) ? item.initialQuantity : 0,
            dispatchCb: () => {},
            isIncompatible,
            //detailsCb: () => {}
        }
    });

    const initialState:GridState = { items: cardItems, filter: () => true, modal: null, incompatibilityMap: config.slideConfig.incompatibilityMap, isMultiple: config.slideConfig.multipleChoices };

    return initialState;
}

/**
 * GRID
 */

const GridContext = createContext<{ items: GridCardProps[], modal:null|'cart'|'incompatible', dispatch: Function }>({ items: [], modal: null, dispatch: () => {} });

type GridListModelProps = SlideBaseProps & {
    slideConfig: {
        mandatoryChoice: boolean                                                                // skippable
        multipleChoices: boolean                                                                // mono ou multi choix
        hasCart: boolean                                                                        // selection visible dans panier
        quantityChoices: boolean                                                                // possibilité de choisir la quantité des items
        filters?: React.ReactNode                                                               // activation des filtres composant fourni
        incompatibilityMap?: { [key:string]: string[] }                                         // for a given product ID, list incomaptible products
    },
    items: {
        id: string
        title: string
        vignette: string
        initialQuantity: number
    }[]
}

export default function GridListModel(props:GridListModelProps) {
    const _props = Object.assign({}, SlideBasePropsDefaults, props);
    const [state, dispatchUpdate] = useReducer(itemReducer, _props, stateInitBuilder);
    const itemSelectionCount:number = state.items.reduce((acc, curr) => ((curr?.quantity ?? 0) > 0) ? acc + 1 : acc, 0);
    const isNextDisabled = (_props.slideConfig.mandatoryChoice && itemSelectionCount === 0);
    const filteredItems = state.items.filter((state.filter as any));

    return (
        <GridContext.Provider value={ { items: state.items, modal: state.modal, dispatch: dispatchUpdate } }>
            <article className={ styles["grm-SlideWrapper"] }>
                <header className={ styles["grm-Header"] }>
                    <button className={ styles["grm-Header-BackBtn"] } onClick={ () => { history.back() } }><FontAwesomeIcon color="#ffffff" icon="arrow-left" size="xl" /></button>
                    <h1 className={ styles["grm-Header-Title"] }>{ _props.slideTitle }</h1>
                    { _props.slideConfig.hasCart && <button onClick={ () => dispatchUpdate({ type: "show cart" }) } className={ styles["grm-Header-CartBtn"] }>Votre sélection <span>{ itemSelectionCount }</span></button> }
                    <button onClick={ _props.slideNextCb } disabled={ isNextDisabled } className={ styles["grm-Header-NextBtn"] }>{ _props.slideNextLabel }</button>
                </header>
                { _props.slideConfig.filters ?? null }
                <menu className={ styles["grm-ContentGrid"] }>
                    { filteredItems.map(item => {
                        const { id, dispatchCb, ...rest } = item;
                        return <GridCard key={ id } id={ id } {...rest} dispatchCb={ dispatchUpdate } />
                    })}
                </menu>
                <CartModal />
                <IncompatibleModal />
            </article>
        </GridContext.Provider>
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
    isIncompatible: boolean                                                                     // always false, unless selected another incompatible product
    detailsCb?: Function                                                                        // leave undefined if no details available
    quantity?: number                                                                           // quantity selected (qt-cart) otherwise either 0 or 1 
}

function GridCard(item:GridCardProps) {
    const { id, title, vignette, selectionType, detailsCb, quantity, dispatchCb, isIncompatible } = item;
    const isSelected = (typeof quantity === 'number' && quantity >= 1);
    const detailLink = (detailsCb !== undefined) 
        ? <button onClick={ () => detailsCb() } className={ styles["grc-Card-DetailLink"] }><FontAwesomeIcon color="#004770" icon="magnifying-glass" /></button>
        : null;

    function callToActionSolver() {
        switch(true) {
            case (isIncompatible): return <button onClick={ () => dispatchCb({ type: "show incompatible modal" }) } className={ styles["grc-Card-Incompatible"] }><FontAwesomeIcon color="#CC3636" icon="hand" /></button>;
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

/**
 * BASE FILTER
 */
type BaseFilterProps = {
    hasAllFilter: boolean
    groupBy: string|Function
}

export function BaseFilter({ hasAllFilter, groupBy }:BaseFilterProps) {
    const _groupBy = (typeof groupBy === "function")
        ? groupBy
        : (itemsToFilter:any[]) => { return LodashGroupBy(itemsToFilter, (item) => item[groupBy]) };

    const { items, dispatch } = useContext(GridContext);
    const [filterState, setFilterState] = useState<{ filterName: string, isSelected: boolean, selectCb: Function }[]>([]);

    const handleFilterClick = (filterName:string) => () => {
        // interacted filter
        const matchFilter = filterState.find(filter => filter.filterName === filterName);
        if(!matchFilter || matchFilter.isSelected) return;

        // update selected states
        const newFilterState = filterState.map(filter => {
            return (filter.filterName === filterName)
                ? {...filter, isSelected: true}
                : {...filter, isSelected: false}
        });

        // apply & dispatch filter update
        setFilterState(newFilterState);
        matchFilter.selectCb();
    }

    // initialise filters based on provided items and groupBy function
    useEffect(() => {
        const filtersWithoutCb:{ filterName: string }[] = Object.keys(_groupBy(items)).map((groupName) => ({ filterName: groupName }));
        let filters:{ filterName: string, isSelected: boolean, selectCb: Function }[] = [];
        if(!hasAllFilter) {
            // make first filter selected and dispatch filter function
            filters = filtersWithoutCb.map((partialFilter, index) => {
                const selectCb = () => { dispatch({ type: "filter update", payload: (item:any) => (item.forme === partialFilter.filterName) }) };
                if(index === 0) {
                    selectCb();
                    return {...partialFilter, isSelected: true, selectCb };
                } else {
                    return {...partialFilter, isSelected: false, selectCb };
                }
            });
        } else {
            // add all filter and select it and dispatch identity function
            filters = filtersWithoutCb.map(partialFilter => {
                const selectCb = () => { dispatch({ type: "filter update", payload: (item:any) => (item.forme === partialFilter.filterName) }) };
                return {...partialFilter, isSelected: false, selectCb };
            });
            filters.unshift({ filterName: "Tous", isSelected: true, selectCb: () => { dispatch({ type: "filter update", payload: () => true }) }});
            dispatch({ type: "filter update", payload: () => true });
        }
        setFilterState(filters);
    }, [groupBy, hasAllFilter]);

    return (
        <menu className={ styles["grf-ContentFilters"] }>
            { filterState.map(filter => <button onClick={ handleFilterClick(filter.filterName) } key={ filter.filterName } className={ `${ styles["grf-FilterBtn"] } ${ (filter.isSelected) ? styles["grf-FilterBtn--active"] : '' }` }>{ filter.filterName }</button> )}
        </menu>
    )    
}

/**
 * CART MODAL
 */
function CartModal() {
    const { items, modal, dispatch } = useContext(GridContext);
    const refCount:number = items.reduce((acc, curr) => ((curr?.quantity ?? 0) > 0) ? acc + 1 : acc, 0);
    const totalCount:number = items.reduce((acc, curr) => ((curr?.quantity ?? 0) > 0) ? acc + (curr?.quantity ?? 0) : acc, 0);
    const selectedItems = items.filter(item => ((item.quantity ?? 0) > 0));

    return (
        <Modal show={ (modal === 'cart') } dialogClassName="grcrt-CartModal" onHide={ () => dispatch({ type: "hide cart" }) }>
            <Modal.Header closeButton>
                <Modal.Title>Votre sélection</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className={ styles["grcrt-Subtitle"] }>{ totalCount } articles, { refCount } références</p>
                <section className={ styles["grcrt-CartSection"] }>
                    {/* <header>Modèle</header> */}
                    { selectedItems.map(item => {
                        const { id, dispatchCb, ...rest } = item;
                        return <CartProductCard key={ id } id={ id } {...rest} dispatchCb={ dispatch } />
                    })}
                </section>
            </Modal.Body>
        </Modal>
    )
}

/**
 * CART PRODUCT CARD
 */
 type CartProductCardProps = {
    id: string
    title: string
    vignette: string
    selectionType: 'select'|'qt-cart'|'mono-cart'
    dispatchCb: Function
    quantity?: number
}

function CartProductCard(item:CartProductCardProps) {
    const { id, title, vignette, selectionType, quantity, dispatchCb } = item;
    if(selectionType === 'select') {
        console.info(`cart not compatible with selection`);
        return null;
    }

    const isSelected = (typeof quantity === 'number' && quantity >= 1);

    function callToActionSolver() {
        switch(true) {
            case (!isSelected && selectionType === 'qt-cart'):
            case (!isSelected && selectionType === 'mono-cart'): return <button onClick={ () => dispatchCb({ type: "add one", payload: id }) } className={ styles["grc-Card-Cta"] }>+</button>;
            case (isSelected && selectionType === 'qt-cart'): return <div className={ styles["grc-Card-CtaQtSelector"] }><button onClick={ () => dispatchCb({ type: "remove one", payload: id }) } className={ styles["grc-Card-CtaDecrement"] }>-</button><span className={ styles["grc-Card-CtaCount"] }>{ quantity }</span><button onClick={ () => dispatchCb({ type: "add one", payload: id }) } className={ styles["grc-Card-CtaIncrement"] }>+</button></div>;
            case (isSelected && selectionType === 'mono-cart'): return <button onClick={ () => dispatchCb({ type: "remove one", payload: id }) } className={ styles["grc-Card-CtaRemoveFromCart"] }><FontAwesomeIcon color="#004770" icon="trash" /></button>;
        }
    }

    return (
        <section className={ styles["grcpc-Card"] }>
            <img className={ styles["grcpc-Card-Vignette"] } src={ vignette } alt="product image" />
            <span className={ styles["grcpc-Card-Description-Label"] }>{ title }</span>
            <footer className={ styles["grcpc-Card-Description"] }>
                { callToActionSolver() }
            </footer>
        </section>
    );
}

/**
 * INCOMPATIBLE MODAL
 */
 function IncompatibleModal() {
    const { modal, dispatch } = useContext(GridContext);

    return (
        <Modal show={ (modal === 'incompatible') } dialogClassName="gricp-IncompatibleModal" onHide={ () => dispatch({ type: "hide cart" }) }>
            <Modal.Header closeButton>
                <Modal.Title>Produit incompatible</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Certains des produits que vous avez sélectionnés ne sont pas compatibles avec ce produit.<br />Veuillez retirer les produits incompatibles pour sélectionner celui-ci.</p>
            </Modal.Body>
        </Modal>
    )
}

/**
 * UTILS
 */
// Incompatibility solver
const productCompatibilitySolver = (items:{ id:string, quantity:number }[], incompatibilityMap:undefined|{ [key:string]: string[] }) => {
    // if no incompatibilityMap provided leave early
    if(incompatibilityMap === undefined) return () => false;

    const selectedIDs:string[] = items.filter(item => (item.quantity > 0)).map(item => item.id);
    const incompatibleIDs:string[] = selectedIDs.reduce((acc, curr) => {
        const relevantIncompatibilities:string[] = incompatibilityMap[curr] ?? [];
        acc.push(...relevantIncompatibilities);;
        return acc;
    }, ([] as string[]));

    // removed duplicate
    const uniqueIncompatibleIDs:string[] = Array.from(new Set(incompatibleIDs));

    return (productId:string) => uniqueIncompatibleIDs.includes(productId)
}