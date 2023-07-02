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
                        <h2>SAP RPA - configurations</h2>
                        <Link href="/configuration-analyzer" target="_blank">Configuration V0</Link>
                        <br />
                        <Link href="/configuration-analyzer/caracteristics-report" target="_blank">Caracteristics report</Link>
                        <br />
                        <Link href="/tdv" target="_blank">Parcours TDV</Link>
                    </section>
                </div>
            </article>
            <article>
                <header>
                    <h1>Echantillon de modèle de slides</h1>
                </header>
                <div className="row mb-4">
                    <section className="col">
                        <h2>Grille à choix unique</h2>
                        <Link href="/grid-model?usecase=unique-choice-mandatory" target="_blank">Choix unique et obligatoire</Link>
                        <br/>
                        <Link href="/grid-model?usecase=unique-choice-filters-customnext" target="_blank">Choix unique optionnel et bouton suivant custom avec des filtres</Link>
                    </section>
                    <section className="col">
                        <h2>Grille à choix multiple</h2>
                        <Link href="/grid-model?usecase=multiple-choices-filters-mandatory" target="_blank">Multiples, obligatoire (au moins 1) et filtres</Link>
                        <br/>
                        <Link href="/grid-model?usecase=multiple-choices-filters-cart" target="_blank">Multiples, filtres, panier mais pas de quantités</Link>
                        <br/>
                        <Link href="/grid-model?usecase=multiple-choices-filters-cart-quantity-mandatory" target="_blank">Multiples, filtres, panier, quantités, obligatoire</Link>
                        <br/>
                        <Link href="/grid-model?usecase=multiple-choices-filters-cart-compat" target="_blank">Multiples, filtres, panier, compatibilité entre produits mais pas de quantités</Link>
                        <br/>
                        <Link href="/grid-model?usecase=multiple-choices-nofilters-cart-quantity-compat-mandatory" target="_blank">Multiples, panier, quantités, obligatoire, compatibilités, pas de filtres</Link>
                    </section>
                </div>
                <div className="row mb-4">
                    <section className="col">
                        <h2>Contenu</h2>
                        <Link href="/free-content-model">Modèle de contenu libre</Link>
                    </section>
                    <section className="col">
                        <h2>Question</h2>
                        <Link href="/choice-question-model">Modèle de question à choix unique ou multiple</Link>
                        <br/>
                        <Link href="#">TODO Modèle de question à fourchette de prix</Link>
                        <br/>
                        <Link href="#">TODO Modèle de question de date</Link>
                    </section>
                </div>
                <div className="row mb-4">
                    <section className="col">
                        <h2>Postulat, synthèse, ...</h2>
                        <Link href="/postulate-model">Modèle de postulat de fin de configuration piscine</Link>
                    </section>
                    <section className="col">
                        <h2>Carousel</h2>
                        <Link href="#">TODO Modèle de carousel d'images</Link>
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
