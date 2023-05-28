'use client';

import { Metadata } from 'next';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.scss';
import GlobalNavigation from './GlobalNavigation';

// FONTS
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

// FONT AWESOME LIBRARY
import faIconsSetup from '@/init-scripts/fa-icons-setup';
faIconsSetup()

export const metadata:Metadata = {
    title: { default: 'WATBOOK FO', template: '%s | WATBOOK FO' },
    description: 'WATBOOK FO research',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <html lang="fr">
            <body className={inter.className}>
                <Button variant="primary" onClick={ handleShow }>Launch</Button>
                {children}
                <GlobalNavigation show={ show } onHide={ handleClose }/>
            </body>
        </html>
    )
}
