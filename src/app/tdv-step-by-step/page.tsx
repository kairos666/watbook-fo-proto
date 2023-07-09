import { Metadata } from "next";
import TDVStepByStepSimulator from "./TDVStepByStepSimulator";

export const metadata:Metadata = {
    title: 'parcours TDV'
}

export default function CaracReportPage() {
    return (
        <main className="container">
            <header className="row mt-4 mb-2">
                <h1>Simulation de parcours pas à pas</h1>
                <p>Création du parcours en simulant, pas à pas, les choix du client. Lorsqu'une modification est faite à une étape précédente, les étapes suivantes sont supprimées pour être évaluées à nouveau</p>
            </header>
            <div className="row">
                <TDVStepByStepSimulator />
            </div>
        </main>
    )
}