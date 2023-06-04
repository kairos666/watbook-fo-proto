import Link from "next/link";

export default function Home() {
    return (
        <main className="container">
            <article>
                <header>
                    <h1>Echantillon de modèle de slides</h1>
                </header>
                <div className="row mb-4">
                    <section className="col">
                        <h2>Contenu</h2>
                        <Link href="/free-content-model">Modèle de contenu libre</Link>
                    </section>
                    <section className="col">
                        <h2>Question</h2>
                        <Link href="/choice-question-model">Modèle de question à choix unique ou multiple</Link>
                        <br/>
                        <Link href="#">Modèle de question à fourchette de prix</Link>
                        <br/>
                        <Link href="#">Modèle de question de date</Link>
                    </section>
                </div>
                <div className="row mb-4">
                    <section className="col">
                        <h2>Postulat, synthèse, ...</h2>
                        <Link href="/postulate-model">Modèle de postulat de fin de configuration piscine</Link>
                    </section>
                    <section className="col">
                        <h2>Carousel</h2>
                        <Link href="#">Modèle de carousel d'images</Link>
                    </section>
                </div>
            </article>
            <article>
                <header>
                    <h1>Utilitaires</h1>
                </header>
                <div className="row mb-4">
                    <section className="col">
                        <h2>Génération de données factices</h2>
                        <Link href="mock-generator">JSON mock data</Link>
                    </section>
                </div>
            </article>
        </main>
    )
}
