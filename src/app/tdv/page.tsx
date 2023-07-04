import { Metadata } from "next";
import TDVSimulator from "./TDVSimulator";

export const metadata:Metadata = {
    title: 'parcours TDV'
}

export default function CaracReportPage() {
    return (
        <main>
            <section>             
                <TDVSimulator />
            </section>
        </main>
    )
}