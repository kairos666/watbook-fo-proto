'use client';

import { useState } from "react";
import tdvDescription from './tdv-descriptor.json';
import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";
import { TDVStep, TDVTransition } from "./tdv-descriptor.type";
import { staticGenerationAsyncStorage } from "next/dist/client/components/static-generation-async-storage";

type TDVStepByStepSimulatorProps = {}

export default function TDVStepByStepSimulator({}:TDVStepByStepSimulatorProps) {
    const [state, setState] = useState(() => {
        const rootStep = tdvDescription.tdvSteps.find(step => (step.isStartStep)) ?? null;
        if(rootStep === null) throw new Error('pas de root step trouvée');

        return [ rootStep.id ];
    });

    const onNextCB = (nextStepId:string) => {
        setState([...state, nextStepId]);
    }
    const onCancelCB = (canceledStepId:string) => {
        const cancelIndex = state.indexOf(canceledStepId);
        setState([...state.slice(0, cancelIndex + 1)]);
    }

    return (
        <>
            <article>
                <header>
                    <h3>Etapes du parcours de configuration de piscine</h3>
                </header>
                <ol>
                    { state.map(stepId => {
                        const step = tdvDescription.tdvSteps.find(step => (step.id === stepId)) ?? null;
                        const nextTransitions = tdvDescription.tdvTransitions.filter(trans => (trans.from === stepId));
                        if(step === null) throw new Error('step non trouvée');

                        return (
                            <li key={ stepId } className="my-3 p-3 border rounded border-info">
                                <TDVSimulatedStep step={ step } nextTransitions={ nextTransitions } cbNextStep={ onNextCB } cbCancelStep={ onCancelCB } />
                            </li>
                        );
                    })}
                </ol>
            </article>
        </>
    )
}

type TDVSimulatedStepProps = {
    step:TDVStep
    nextTransitions:TDVTransition[]
    cbNextStep: (nextStepId:string) => void
    cbCancelStep: (canceledStepId:string) => void
}

function TDVSimulatedStep({ step, nextTransitions, cbNextStep, cbCancelStep }:TDVSimulatedStepProps) {
    const [choiceMade, setChoiceMade] = useState((false as boolean|string));

    function interactionsBuilder() {
        const choiceLabelSolver = (conditions:string[]|undefined, conditionType:string|undefined) => {
            return (conditions && conditionType === "ANY")
                ? conditions.join(' [OU] ')
                : (conditions && conditionType === "AND")
                ? conditions.join(' [ET] ')
                : (conditions)
                ? conditions.join(' [ET] ')
                : 'choix (sans conditions)';
        }

        switch(true) {
            case (choiceMade && nextTransitions.length === 0): 
                return (
                    <>
                        <span className="badge rounded-pill bg-success">Etape validée - C'était la dernière étape de TDV</span>
                        <ButtonToolbar aria-label="actions sur l'étape" className="mt-3">
                            <Button onClick={ () => { setChoiceMade(false); cbCancelStep(step.id) } } variant="outline-secondary">annuler le choix</Button>
                        </ButtonToolbar>
                    </>
                )
            case (choiceMade && nextTransitions.length === 1): 
                return (
                    <>
                        <span className="badge rounded-pill bg-success">Etape validée</span>
                        <ButtonToolbar aria-label="actions sur l'étape" className="mt-3">
                            <Button onClick={ () => { setChoiceMade(false); cbCancelStep(step.id) } } variant="outline-secondary">annuler le choix</Button>
                        </ButtonToolbar>
                    </>
                )
            case (!choiceMade && nextTransitions.length === 0):
                return (
                    <>
                        <span className="badge rounded-pill bg-warning text-dark">Etape non validée</span>
                        <ButtonToolbar aria-label="actions sur l'étape" className="mt-3">
                            <Button onClick={ () => setChoiceMade(true) } variant="outline-secondary">choisir</Button>
                        </ButtonToolbar>
                    </>
                ) 
            case (!choiceMade && nextTransitions.length === 1): 
            case (!choiceMade && nextTransitions.length >= 1):
                return (
                    <>
                        <span className="badge rounded-pill bg-warning text-dark">Etape non validée</span>
                        <ButtonToolbar aria-label="actions sur l'étape" className="mt-3">
                            <ButtonGroup aria-label="plusieurs choix possibles">
                                { nextTransitions.map(trans => {
                                    return (
                                        <Button key={ `${ trans.from } to ${ trans.to }` } onClick={ () => { setChoiceMade(trans.to); cbNextStep(trans.to) } } variant="outline-secondary">{ choiceLabelSolver(trans.conditions, trans.conditionType) }</Button>
                                    )
                                })}
                            </ButtonGroup>
                        </ButtonToolbar>
                    </>
                )
            case (choiceMade && nextTransitions.length > 1):
                return (
                    <>
                        <span className="badge rounded-pill bg-success">Etape validée</span>
                        <br />
                        { nextTransitions.filter(trans => (trans.to === choiceMade)).map(trans => (<span key={ `${ trans.from } to ${ trans.to }` } className="badge bg-info text-dark">{ choiceLabelSolver(trans.conditions, trans.conditionType) }</span>))}
                        <ButtonToolbar aria-label="actions sur l'étape" className="mt-3">
                            <Button onClick={ () => { setChoiceMade(false); cbCancelStep(step.id) } } variant="outline-secondary">annuler le choix</Button>
                        </ButtonToolbar>
                    </>
                )
            default:
                return <p>Cas inconnu</p>
        }
    }

    return (
        <>
            <h4>{ step.name }</h4>
            <p className="text-muted">slide: { step.slideType }</p>
            <menu className="ps-0 m-0">
                { interactionsBuilder() }
            </menu>
        </>
    )
}