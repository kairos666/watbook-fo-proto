import { Metadata } from 'next';
import 'bootstrap/scss/bootstrap.scss';
import '../styles/globals.scss';

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
                { children }
            </body>
        </html>
    )
}
