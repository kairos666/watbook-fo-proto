import { Metadata } from "next";
import styles from "./new-wat-configurator.module.scss";

export const metadata:Metadata = {
    title: 'PROTO WAT CONFIGURATOR'
}

export default function NewWatConfigurator() {
    return (
        <main className={ styles["nwc-PageWarpper"] }>
            <article className={ styles["nwc-Layout"] }>
                <section className={ styles["nwc-LayoutCell"] }>
                    <header className={ styles["nwc-LayoutCell_Header"] }>
                        <h2 className="display-6">TDV</h2>
                        <p className="lead">Les étapes de choix du projet client</p>
                    </header>
                    <div className={ styles["nwc-LayoutCell_Body"] }>
                        <p>real content</p>
                        <div className={ styles["nwc-LayoutCell_Body_Anchor"] }></div>
                    </div>
                </section>
                <section className={ styles["nwc-LayoutCell"] }>
                    <header className={ styles["nwc-LayoutCell_Header"] }>
                        <h2 className="display-6">Config. client</h2>
                        <p className="lead">La configuration client en cours de définition</p>
                    </header>
                    <div className={ styles["nwc-LayoutCell_Body"] }>
                        <p>real content</p>
                        <div className={ styles["nwc-LayoutCell_Body_Anchor"] }></div>
                    </div>
                </section>
                <section className={ styles["nwc-LayoutCell"] }>
                    <header className={ styles["nwc-LayoutCell_Header"] }>
                        <h2 className="display-6">Configs complètes</h2>
                        <p className="lead">Les configurations compatibles du catalogue SAP</p>
                    </header>
                    <div className={ styles["nwc-LayoutCell_Body"] }>
                        <p>real content</p>
                        <div className={ styles["nwc-LayoutCell_Body_Anchor"] }></div>
                    </div>
                </section>
            </article>
        </main>
    )
}