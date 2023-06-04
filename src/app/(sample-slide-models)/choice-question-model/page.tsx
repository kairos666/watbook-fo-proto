import ClosedQuestionChoicesModel from "@/slide-components/ClosedQuestionChoicesModel";
import { Metadata } from "next";

export const metadata:Metadata = {
    title: 'modèle : question fermée'
}

export default function ChoiceQuestionSample() {
    return (
        <main>
            <ClosedQuestionChoicesModel slideTitle="Souhaitez-vous bénéficier d'un financement ?" slideIllu="/samples/side-view-pool.png" choices={ ['Oui', 'Non'] } options={ { isRequired: true, isMultiple: false } } />
        </main>
    )
}
