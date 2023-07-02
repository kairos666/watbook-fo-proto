import { Metadata } from "next";
import TDVSimulator from "./TDVSimulator";

export const metadata:Metadata = {
    title: 'parcours TDV'
}

export default function CaracReportPage() {
    return (
        <main className="container">
            <div className="mt-3 position-sticky top-0 end-0">
                <p>parcours TDV</p>
            </div>
            <div className="row my-4">
                <section className="col">             
                    <TDVSimulator />
                </section>
            </div>
        </main>
    )
}