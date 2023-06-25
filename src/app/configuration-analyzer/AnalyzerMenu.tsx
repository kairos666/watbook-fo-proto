'use client';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { useConfigAnalyzerState } from './useConfigAnalyzerState';

type AnalyzerMenuProps = {}

export default function AnalyzerMenu({}:AnalyzerMenuProps) {

    const { toggleOpen, translateTo, translation } = useConfigAnalyzerState();

    return (
        <ButtonToolbar aria-label="Menu de l'analyzer" className="flex-row-reverse bg-body-tertiary p-2">
            <ButtonGroup className="me-2" aria-label="ouvrir/fermer les accordéons">
                <Button variant="primary" onClick={ toggleOpen }>ouvrir / fermer</Button>
            </ButtonGroup>
            <ButtonGroup className="me-2" aria-label="langages">
                <Button onClick={ () => translateTo("tech") } variant={ (translation === "tech") ? "primary" : "outline-secondary" }>TECH</Button>
                <Button onClick={ () => translateTo("EN") } variant={ (translation === "EN") ? "primary" : "outline-secondary" }>EN</Button>
                <Button onClick={ () => translateTo("FR") } variant={ (translation === "FR") ? "primary" : "outline-secondary" }>FR</Button>
                <Button onClick={ () => translateTo("DE") } variant={ (translation === "DE") ? "primary" : "outline-secondary" }>DE</Button>
                <Button onClick={ () => translateTo("ES") } variant={ (translation === "ES") ? "primary" : "outline-secondary" }>ES</Button>
            </ButtonGroup>
        </ButtonToolbar>
    );
}