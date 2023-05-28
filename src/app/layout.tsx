import { Metadata } from 'next';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.scss';
import GlobalNavigation from './GlobalNavigation';

// FONTS
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

export const metadata:Metadata = {
    title: { default: 'WATBOOK FO', template: '%s | WATBOOK FO' },
    description: 'WATBOOK FO research',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr">
            <body className={inter.className}>
                <GlobalNavigation>
                    { children }
                </GlobalNavigation>
            </body>
        </html>
    )
}
