import { Metadata } from "next";
import config from "./configuration_V0.json";
import { ConfigCaracteristic, ConfigPricingTable, ConfigSubItem, ConfigTitle, ConfigVariantConditionsTable } from "./ConfigParser";
import AnalyzerMenu from "./AnalyzerMenu";

export const metadata:Metadata = {
    title: 'configuration analyzer'
}

export default function ConfigAnalyzer() {
    return (
        <main className="container">
            <div className="mt-3 position-sticky top-0 end-0">
                <AnalyzerMenu />
            </div>
            <div className="mt-3 mb-3">
                <ConfigTitle config={ config } />
            </div>
            <div className="row mb-4">                
                <section className="col">
                    <h2>Pricing (x{ config.rootItem.pricing.length })</h2>
                    <ConfigPricingTable config={ config } />
                </section>
                <section className="col">
                    <h2>Variant conditions (x{ config.rootItem.variantConditions.length })</h2>
                    <ConfigVariantConditionsTable config={ config } />
                </section>
            </div>
            <div className="row mb-4">
                <section className="col">
                    <h2>Caracteristics (x{ config.rootItem.characteristics.length })</h2>
                    <hr />
                    { config.rootItem.characteristics.map(caracItem => <ConfigCaracteristic key={ caracItem.id } caracteristic={ caracItem } />)}
                </section>
            </div>
            <div className="row mb-4">
                <section className="col">
                    <h2 className="mb-3">Subitems (x{ config.rootItem.subItems.length })</h2>
                    <hr />
                    { config.rootItem.subItems.map(subItem => <ConfigSubItem key={ subItem.id } subItem={ subItem } /> )}
                </section>
            </div>
        </main>
    )
}
