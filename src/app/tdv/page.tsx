import { Metadata } from "next";
import TDVSimulator from "./TDVSimulator";

export const metadata:Metadata = {
    title: 'parcours TDV'
}

export default function CaracReportPage() {
    return (
        <main>
            <section style={{ height: 'calc(100vh - 6rem)', width: 'calc(100vw - 6rem)', margin: '3rem' }}>             
                <TDVSimulator />
            </section>
        </main>
    )
}