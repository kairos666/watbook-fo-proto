import { Metadata } from "next";
import TDVSimulator from "./TDVSimulator";

export const metadata:Metadata = {
    title: 'parcours TDV'
}

export default function CaracReportPage() {
    return (
        <main>
            <header className="container">
                <h1 className="row my-4">Parcours TDV</h1>
            </header>
            <section style={{ height: 'calc(80vh - 6rem)', width: 'calc(100vw - 6rem)', margin: 'auto' }}>             
                <TDVSimulator />
            </section>
            <section className="container">
                <header className="row mt-4 mb-2">
                    <h2>Simulation de parcours pas à pas</h2>
                </header>
                <div className="row">
                    <p>TODO</p>
                </div>
            </section>
        </main>
    )
}