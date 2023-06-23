import GlobalNavigation from './../GlobalNavigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <GlobalNavigation>
            { children }
        </GlobalNavigation>
    )
}
