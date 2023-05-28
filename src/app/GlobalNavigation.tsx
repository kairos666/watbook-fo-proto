import { Offcanvas } from 'react-bootstrap';

type GlobalNavigationProps = {
    show: boolean
    onHide: () => void
}

export default function GlobalNavigation({ show, onHide }:GlobalNavigationProps) {
    return (
        <Offcanvas show={ show } onHide={ onHide }>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.</Offcanvas.Body>
        </Offcanvas>
    );
}