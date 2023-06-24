'use client';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { useConfigAnalyzerState } from './useConfigAnalyzerState';

type AnalyzerMenuProps = {}

export default function AnalyzerMenu({}:AnalyzerMenuProps) {

    const { toggleOpen, toggleTranslation } = useConfigAnalyzerState(state => ({ toggleOpen: state.toggleOpen, toggleTranslation: state.toggleTranslation }));

    return (
        <ButtonToolbar aria-label="Menu de l'analyzer">
            <ButtonGroup className="me-2" aria-label="ouvrir/fermer les accordéons">
                <Button variant="primary" onClick={ toggleOpen }>ouvrir / fermer</Button>
            </ButtonGroup>
            <ButtonGroup className="me-2" aria-label="références techniques ou traduire en langage humain">
                <Button variant="primary" onClick={ toggleTranslation }>réf. tech / libellé</Button>
            </ButtonGroup>
        </ButtonToolbar>
    );
}