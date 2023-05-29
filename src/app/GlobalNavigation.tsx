'use client'

import styles from '../styles/global-navigation.module.scss';
import { Button, Offcanvas } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import Image from 'next/image';

// FONT AWESOME LIBRARY
import faIconsSetup from '@/init-scripts/fa-icons-setup';
faIconsSetup();

type GlobalNavigationProps = {
    children: React.ReactNode
}

export default function GlobalNavigation({ children }:GlobalNavigationProps) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    switch(true) {
        case true:
            // navigation when inside parcours
            return (
                <div className={ styles['gnav-wrapper'] }>
                    <div className={ styles['gnav-TopBar'] }></div>
                    <nav className={ styles['gnav-SideBar'] }>
                        <Image src="/W.svg" alt="Watbook Logo" className={ styles['gnav-SideBar-Logo'] } width={48} height={34} priority />
                        <div className={ styles['gnav-SideBar-NavigationSlot'] }>
                            <button className="btn-reset" onClick={ handleShow }><FontAwesomeIcon color="#004770" icon="person-swimming" size="2xl" /></button>
                            <button className="btn-reset" onClick={ () => { alert("bouchonné") } }><FontAwesomeIcon color="#004770" icon={['fas', 'w']} size="2xl" /></button>
                            <button className="btn-reset" onClick={ () => { alert("bouchonné") } }><FontAwesomeIcon color="#004770" icon={['fas', 'wrench']} size="2xl" /></button>
                            <button className="btn-reset" onClick={ () => { alert("bouchonné") } }><FontAwesomeIcon color="#004770" icon={['fas', 'list-check']} size="2xl" /></button>
                        </div>
                        <div className={ styles['gnav-SideBar-FunctionalSlot'] }>
                            <button className="btn-reset" onClick={ () => { alert("bouchonné") } }><FontAwesomeIcon color="#004770" icon={['far', 'user']} size="2xl" /></button>
                            <button className="btn-reset" onClick={ () => { alert("bouchonné") } }><FontAwesomeIcon color="#004770" icon={['far', 'folder']} size="2xl" /></button>
                        </div>
                    </nav>
                    <div className={ styles['gnav-transclusion-window'] }>
                        { children }
                    </div>
                    <Offcanvas backdrop={ true } show={ show } onHide={ handleClose }>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Menu</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>navigation stuff</Offcanvas.Body>
                    </Offcanvas>
                </div>
            );

        default:
            // navigation when not in parcours
            return (
                <div className={ styles['gnav-wrapper'] }>
                    <div className={ styles['gnav-TopBar'] }></div>
                    <nav className={ styles['gnav-SideBar'] }>
                        <Image src="/W.svg" alt="Watbook Logo" className={ styles['gnav-SideBar-Logo'] } width={48} height={34} priority />
                        <div className={ styles['gnav-SideBar-NavigationSlot'] }>
                            <button className="btn-reset" onClick={ handleShow }><FontAwesomeIcon color="#004770" icon="hamburger" size="2xl" /></button>
                        </div>
                        <div className={ styles['gnav-SideBar-FunctionalSlot'] }>
                            <button className="btn-reset" onClick={ () => { alert("bouchonné") } }><FontAwesomeIcon color="#004770" icon="arrows-rotate" size="2xl" /></button>
                            <button className="btn-reset" onClick={ () => { alert("bouchonné") } }><FontAwesomeIcon color="#004770" icon={['far', 'folder']} size="2xl" /></button>
                        </div>
                    </nav>
                    <div className={ styles['gnav-transclusion-window'] }>
                        { children }
                    </div>
                    <Offcanvas backdrop={ true } show={ show } onHide={ handleClose }>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.</Offcanvas.Body>
                    </Offcanvas>
                </div>
            );
    }
}