import PostulateModel from "@/slide-components/PostulateModel";
import { Metadata } from "next";

export const metadata:Metadata = {
    title: 'modèle : postulat'
}

export default function PostulateSample() {
    return (
        <main>
            <PostulateModel />
        </main>
    )
}
