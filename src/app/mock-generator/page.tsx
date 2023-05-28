'use client';

import PoolBuilder from "@/mock-data/PoolBuilder";
import PoolProfilBuilder from "@/mock-data/PoolProfilBuilder";
import StairBuilder from "@/mock-data/StairBuilder";
import { Metadata } from "next";
import { Button } from "react-bootstrap";

export const metadata:Metadata = {
    title: 'mock data generators'
}

export default function MockGenerator() {
    return (
        <main className="container mt-5">
            <div className="row">
                <section className="col">
                    <h2>Piscine</h2>
                    <Button variant="outline-primary" onClick={ () => console.log(PoolBuilder()) }>générer une piscine (console)</Button>
                </section>
                <section className="col">
                    <h2>Profil de fond</h2>
                    <Button variant="outline-primary" onClick={ () => console.log(PoolProfilBuilder()) }>générer un profil de fond (console)</Button>
                </section>
                <section className="col">
                    <h2>Escalier</h2>
                    <Button variant="outline-primary" onClick={ () => console.log(StairBuilder()) }>générer un escalier (console)</Button>
                </section>
            </div>
        </main>
    )
}
