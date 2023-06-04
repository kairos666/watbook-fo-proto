import PostulateModel from "@/slide-components/PostulateModel";
import { Metadata } from "next";

export const metadata:Metadata = {
    title: 'modèle : postulat'
}

export default function PostulateSample() {
    return (
        <main>
            <PostulateModel
                slideTitle="Résumons ensemble..."
                slideIllu="/samples/top-view-pool.png"
                projectTitle="Projet de Mr Dubriand"
                checks={[
                    <>Modèle <b>Barbara</b>. Taille : 7m à 7,90m x 3m à 3,90m</>,
                    <>En 72 mensualités de confort : <b>694 €</b></>,
                    <>Modèle <b>Orbis.</b> Coloris : blanc</>,
                    <>Date du 1er plongeon <b>20 avril 2024</b></>,
                    <>Ligne d'équipement : <b>Top</b></>,
                    <>Date démarrage des travaux : <b>20 août 2024</b></>,
                    <>Budget de <b>50 000 €</b></>
                ]}
            />
        </main>
    )
}
