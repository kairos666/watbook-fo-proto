'use client';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { useConfigAnalyzerState } from '../../useConfigAnalyzerState';
import { useCaracReportState } from './useCaracReportState';

type CaracReportMenuProps = {}

export default function CaracReportMenu({}:CaracReportMenuProps) {
    const { translation, translateTo } = useConfigAnalyzerState(state => ({ translation: state.translation, translateTo: state.translateTo }));
    const { isAlphabeticSort, isSystemChoicesFilteredOut, toggleAlphaSort, toggleFilterOutSystem } = useCaracReportState();

    return (
        <ButtonToolbar aria-label="Menu de l'analyzer" className="flex-row-reverse bg-body-tertiary p-2">
            <ButtonGroup className="me-2" aria-label="langages">
                <Button onClick={ () => translateTo("tech") } variant={ (translation === "tech") ? "primary" : "outline-secondary" }>TECH</Button>
                <Button onClick={ () => translateTo("EN") } variant={ (translation === "EN") ? "primary" : "outline-secondary" }>EN</Button>
                <Button onClick={ () => translateTo("FR") } variant={ (translation === "FR") ? "primary" : "outline-secondary" }>FR</Button>
                <Button onClick={ () => translateTo("DE") } variant={ (translation === "DE") ? "primary" : "outline-secondary" }>DE</Button>
                <Button onClick={ () => translateTo("ES") } variant={ (translation === "ES") ? "primary" : "outline-secondary" }>ES</Button>
            </ButtonGroup>
            <ButtonGroup className="me-2" aria-label="ordre de tri">
                <Button variant="primary" onClick={ toggleAlphaSort }>{ (isAlphabeticSort) ? "retirer tri" : "appliquer tri" }</Button>
            </ButtonGroup>
            <ButtonGroup className="me-2" aria-label="filtrer">
                <Button variant="primary" onClick={ toggleFilterOutSystem }>{ (isSystemChoicesFilteredOut) ? "ne pas filtrer" : "appliquer filtre" }</Button>
            </ButtonGroup>
        </ButtonToolbar>
    );
}