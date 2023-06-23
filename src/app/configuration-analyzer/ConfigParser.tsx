'use client';

import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';

type ConfigParserProps = {
    config:any
}

export function ConfigTitle({ config }:ConfigParserProps) {
    return (
        <>
            <h1>CONFIG ID : { config.id }</h1>
            <Stack direction="horizontal" gap={2}>
                <Badge bg="secondary">market : { config.market }</Badge>
                <Badge bg="secondary">country : { config.country }</Badge>
            </Stack>
        </>
    );
}

export function ConfigPricingTable({ config }:ConfigParserProps) {
    return (
        <Table striped hover size="sm">
            <thead>
                <tr>
                    <th>conditionType</th>
                    <th>conditionValue</th>
                    <th>currency</th>
                    <th>varcondKey</th>
                </tr>
            </thead>
            <tbody>
                { (config.rootItem.pricing as any[]).map((priceItem, index) => {
                    return (
                        <tr key={ `price-item-${ index }` }>
                            <td>{ priceItem.conditionType }</td>
                            <td>{ priceItem.conditionValue }</td>
                            <td>{ priceItem.currency }</td>
                            <td>{ priceItem.varcondKey }</td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    );
}

export function ConfigVariantConditionsTable({ config }:ConfigParserProps) {
    return (
        <Table striped hover size="sm">
            <thead>
                <tr>
                    <th>key</th>
                    <th>factor</th>
                </tr>
            </thead>
            <tbody>
                { (config.rootItem.variantConditions as any[]).map((item, index) => {
                    return (
                        <tr key={ `variant-cond-item-${ index }` }>
                            <td>{ item.key }</td>
                            <td>{ item.factor }</td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    );
}

type ConfigCaracteristicProps = {
    caracteristic:any
}

export function ConfigCaracteristic({ caracteristic }:ConfigCaracteristicProps) {
    const valuesCount = caracteristic.values.length;
    const possibleValuesCount = caracteristic.possibleValues?.length ?? 0;
    const valueBG = (valuesCount === 0)
        ? "danger"
        : (valuesCount > 1)
        ? "warning"
        : "success";
    const possibleValuesBG = (possibleValuesCount === 0)
        ? "danger"
        : (possibleValuesCount > 1)
        ? "success"
        : "warning";
    
    const valuesFormatter = (values :{ value: string }[]) => {
        switch(true) {
            case (values.length > 1):
                return <span>{ (caracteristic.values as any[]).map(valueObj => valueObj.value).join(', ') } <small style={ { color: "var(--bs-danger)" } }><i>PLUSIEURS VALEURS</i></small></span>
            case (values.length === 0):
                return <small style={ { color: "var(--bs-danger)" } }><i>NON REMPLI</i></small>

            default:
                return values[0].value
        }
    }

    return (
        <details className="mb-3" open>
            <summary><span className="h4">{ caracteristic.id } = { valuesFormatter(caracteristic.values) }</span></summary>
            <div className="mt-2">
                <Stack direction="horizontal" gap={2}>
                    <Badge pill bg={ valueBG }>values : { valuesCount }</Badge>
                    <Badge pill bg={ possibleValuesBG }>Possible values : { possibleValuesCount }</Badge>
                </Stack>
                { (caracteristic.possibleValues && caracteristic.possibleValues.length !== 0)
                    ?   <Table striped hover size="sm">
                            <thead>
                                <tr>
                                    <th>valueLow</th>
                                    <th>selectable</th>
                                    <th>intervalType</th>
                                </tr>
                            </thead>
                            <tbody>
                                { (caracteristic.possibleValues as any[]).sort((a, b) => (a.selectable && !b.selectable) ? -1 : (!a.selectable && b.selectable) ? 1 : 0).map((pValueObj, index) => (
                                    <tr key={ index }>
                                        <td>{ pValueObj?.valueLow ?? <small style={ { color: "var(--bs-danger)" } }><i>NON REMPLI</i></small> }</td>
                                        <td>{ (typeof pValueObj.selectable !== 'undefined') ? String(pValueObj.selectable) : <small style={ { color: "var(--bs-danger)" } }><i>NON REMPLI</i></small> }</td>
                                        <td>{ pValueObj?.intervalType ?? <small style={ { color: "var(--bs-danger)" } }><i>NON REMPLI</i></small> }</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    :   <p>AUCUNES VALEURS POSSIBLES FOURNIES</p>
                }
            </div>
        </details>
    )
}

type ConfigSubItemProps = {
    subItem:any
}

export function ConfigSubItem({ subItem }:ConfigSubItemProps) {
    return (
        <details className="mb-3">
            <summary>Subitem : { subItem.id } / { subItem.key }
                <Stack direction="horizontal" gap={2}>
                    <Badge bg="secondary">selectable : { String(subItem.selectable) }</Badge>
                    <Badge bg="secondary">quantity : { subItem.quantity.value }</Badge>
                    <Badge bg="secondary">salesRelevant : { String(subItem.salesRelevant) }</Badge>
                </Stack>
            </summary>
            <Table striped hover size="sm">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>values</th>
                        <th>possible values count</th>
                    </tr>
                </thead>
                <tbody>
                    { (subItem.characteristics as any[]).map((item, index) => {
                        return (
                            <tr key={ `subitem-carac-${ index }` }>
                                <td>{ item.id }</td>
                                <td>{ (item.values as any[]).map((valItem, valIndex) => <span key={ `subitem-carac-${ index }-${ valIndex }` }>{ valItem.value } (by { valItem.author })</span>) }</td>
                                <td>{ item.possibleValues.length }</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </details>
    )
}