import { Metadata } from "next";
import CaracReport from "./CaracReport";
import CaracReportMenu from "./CaracReportMenu";

export const metadata:Metadata = {
    title: 'caracteristics report | configuration analyzer'
}

export default function CaracReportPage() {
    return (
        <main className="container">
            <div className="mt-3 position-sticky top-0 end-0">
                <CaracReportMenu />
            </div>
            <div className="row my-4">                
                <CaracReport />
            </div>
        </main>
    )
}