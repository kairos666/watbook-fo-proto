'use client';

import { Badge, Stack } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useConfigAnalyzerState } from "../../useConfigAnalyzerState";
import { useCaracReportState } from "./useCaracReportState";

export default function CaracReport() {
    const { t, translation } = useConfigAnalyzerState(state => ({ t: state.t, translation: state.translation }));
    const { caracteristics, isAlphabeticSort, isSystemChoicesFilteredOut } = useCaracReportState(state => ({ caracteristics: state.caracteristics, isAlphabeticSort: state.isAlphabeticSort, isSystemChoicesFilteredOut: state.isSystemChoicesFilteredOut }));

    return (
        <section className="col">
            <h2>Caractéristiques (x{ caracteristics.length })</h2>
            <Stack direction="horizontal" gap={2}>
                <Badge pill bg="secondary">{ (isAlphabeticSort) ? "Liste alphabétique" : "Ordre naturel" }</Badge>
                <Badge pill bg="secondary">{ (isSystemChoicesFilteredOut) ? "Sans les caractéristiques systèmes" : "Toutes les caractéristiques" }</Badge>
            </Stack>
            <br />
            <Table striped hover size="sm">
                <thead>
                    <tr>
                        <th colSpan={ 2 }>technique</th>
                        <th colSpan={ 2 }>trad { translation.toUpperCase() }</th>
                    </tr>
                    <tr>
                        <th>clef</th>
                        <th>valeur</th>
                        <th>clef</th>
                        <th>valeur</th>
                    </tr>
                </thead>
                <tbody>
                    { caracteristics.map((caracItem, index) => {
                        const rawTechValues = caracItem?.values ?? [];
                        const formatedTechValues = rawTechValues.map((item:any) => item.value).join(', ');
                        const formatedTradValues = rawTechValues.map((item:any) => t(item.value, `caracteristic.${ caracItem.id }.possibleValues.`)).join(', ');
                        return (
                            <tr key={ `carac-item-${ index }` }>
                                <td>{ caracItem.id }</td>
                                <td>{ formatedTechValues }</td>
                                <td>{ t(caracItem.id, `caracteristic.`) }</td>
                                <td>{ formatedTradValues }</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </section>
    )
}