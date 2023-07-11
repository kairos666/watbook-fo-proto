'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PoolBuilder from "@/mock-data/PoolBuilder";
import PoolProfilBuilder from "@/mock-data/PoolProfilBuilder";
import StairBuilder from "@/mock-data/StairBuilder";
import { Metadata } from "next";
import { Button } from "react-bootstrap";
import { FlatConfigV0Builder } from '@/mock-data/ConfigV0Builder';

export const metadata:Metadata = {
    title: 'mock data generators'
}

export default function MockGenerator() {
    return (
        <main className="container">
            <div className="row mb-4">
                <section className="col">
                    <h2>Piscine <FontAwesomeIcon icon="water-ladder" /></h2>
                    <Button variant="outline-primary" onClick={ () => console.log(PoolBuilder()) }>générer une piscine (console)</Button>
                </section>
                <section className="col">
                    <h2>Profil de fond <FontAwesomeIcon icon="diamond" /></h2>
                    <Button variant="outline-primary" onClick={ () => console.log(PoolProfilBuilder()) }>générer un profil de fond (console)</Button>
                </section>
            </div>
            <div className="row mb-4">
                <section className="col">
                    <h2>Escalier <FontAwesomeIcon icon="stairs" /></h2>
                    <Button variant="outline-primary" onClick={ () => console.log(StairBuilder()) }>générer un escalier (console)</Button>
                </section>
                <section className="col">
                    <h2>Config V0 mocks</h2>
                    <Button variant="outline-primary" onClick={ () => console.log(FlatConfigV0Builder(0)) }>générer une config (console)</Button>
                </section>
            </div>
        </main>
    )
}
