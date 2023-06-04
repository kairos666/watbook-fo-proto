import FreeContentModel from "@/slide-components/FreeContentModel";
import { Metadata } from "next";

export const metadata:Metadata = {
    title: 'modèle : contenu libre'
}

export default function FreeContentSample() {
    return (
        <main>
            <FreeContentModel slideTitle="Loi de sécurité" slideIllu="/samples/child-in-pool.png" customNextLabel="J'ai bien pris connaissance">
                <p>La <a href="https://www.economie.gouv.fr/dgccrf/Securite-des-piscines#:~:text=Selon%20le%20code%20de%20la,%2C%20alarme%2C%20barri%C3%A8re%20ou%20couverture." target="_blank">loi du 03-01-2003</a> vous oblige à installer un dispositif de sécurité normalisé avant la première mise en eau de votre piscine.</p>
                <p>Aucun système de sécurité ne peut se substituer à votre vigilance active!</p>
            </FreeContentModel>
        </main>
    )
}
