import { ConfigV0, FlatConfigV0 } from '@/types/ConfigV0';
import { fakerFR as faker } from '@faker-js/faker';

export function configFlatener(srcConfig:ConfigV0, debug:boolean = false):FlatConfigV0 {
    const { id, key, pricing, variantConditions, subItems, characteristics } = srcConfig.rootItem;

    const flattenCharacteristics = characteristics.reduce((acc, curr) => {
        const caracID = curr.id;
        if(debug && acc[caracID] !== undefined) console.warn(`configuration caracteristic repeated : ${ caracID }`);

        switch(true) {
            case (curr?.values === undefined || curr?.values?.length === 0):
                // no value
                if(debug) console.info(`caracteristic : ${ caracID } has no value provided`);
                acc[caracID] = null;
                break;

            case (curr?.values?.length > 1):
                // multi value
                if(debug) console.info(`caracteristic : ${ caracID } has multiple values provided`);
                acc[caracID] = curr?.values.map(valObj => valObj.value);
                break;

            case (curr?.values?.length === 1):
                // mono value (most common case)
                acc[caracID] = curr?.values[0].value;
                break;
            default:
                // unhandled case
                if(debug) console.warn(`caracteristic unknown case : ${ caracID }`, curr?.values);

        }

        return acc;
    }, ({} as any));

    return Object.assign(srcConfig, { rootItem: {
        id, 
        key, 
        pricing, 
        variantConditions, 
        subItems, 
        characteristics: flattenCharacteristics
    }});
}

export function FlatConfigV0Builder(configIndex:number):FlatConfigV0 {
    const configV0:ConfigV0 = ConfigV0Builder(configIndex);
    return configFlatener(configV0);
}

export function ConfigV0Builder(configIndex:number):ConfigV0 {
    const poolModel = faker.helpers.arrayElement(["SOFIA","SARA","CELINE","EMILIE","DIANE","PENELOPE"]);
    const escalierPosition = faker.number.int({ min:1, max:9 });
    const allracc = faker.helpers.arrayElement(["0","-2","-1","1","2"]);
    const hauteur = String(faker.number.int({ min:120, max:300 }));

    return {
        id: faker.string.uuid(),
        SAP_id: faker.string.uuid(),
        market: "FREX",
        country: "DE",
        rootItem: {
            id: String(configIndex),
            key: "WATER_TEST",
            pricing: 'only a mock',
            variantConditions: 'only a mock',
            subItems: 'only a mock',
            characteristics: [
                {
                    id: "W_CANAL",
                    values: [
                        {
                            value: "WATBOOK",
                            author: "User"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_NOM_FORME",
                    values: [
                        {
                            value: faker.helpers.arrayElement(["RECTANGLE","OVALE","LIBRE"])
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_NOM_MODELE",
                    values: [
                        {
                            value: poolModel,
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_CONFIG",
                    values: [
                        {
                            value: "PISCINE",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_ESCALIER_NEW_1_POS_SEQ",
                    values: [
                        {
                            value: `0${ escalierPosition }-00000`,
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_ESCALIER_NEW_1_POS_NUM",
                    values: [
                        {
                            value: String(escalierPosition),
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_ESCALIER_NEW_1_POS_TXT",
                    values: [
                        {
                            value: String(escalierPosition),
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_PROFIL_FOND",
                    values: [
                        {
                            value: faker.helpers.arrayElement(["FP","FP_150","FP150C","MF"]),
                            author: "User"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_NOM_COMMERCIAL",
                    values: [
                        {
                            value: `${ poolModel }0${ faker.number.int({ min:1, max:9 }) }`,
                            author: "User"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_ALL_RACC",
                    values: [
                        {
                            value: allracc,
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_NOM_TECH",
                    values: [
                        {
                            value: "HARICOT",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_DIM_LONG_MAX",
                    values: [
                        {
                            value: String(faker.number.float({ min:3, max:12, precision: 0.01 })),
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_DIM_LONG_2",
                    values: [
                        {
                            value: String(faker.number.float({ min:3, max:12, precision: 0.01 })),
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_DIM_LONG_1",
                    values: [
                        {
                            value: String(faker.number.float({ min:3, max:12, precision: 0.01 })),
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_DIM_LARG_MAX",
                    values: [
                        {
                            value: String(faker.number.float({ min:3, max:12, precision: 0.01 })),
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_DIM_LARG_1",
                    values: [
                        {
                            value: String(faker.number.float({ min:3, max:12, precision: 0.01 })),
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_DIM_D1",
                    values: [
                        {
                            value: String(faker.number.float({ min:3, max:12, precision: 0.01 })),
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_DIM_D2",
                    values: [
                        {
                            value: String(faker.number.float({ min:3, max:12, precision: 0.01 })),
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_DIM_D3",
                    values: [
                        {
                            value: String(faker.number.float({ min:3, max:12, precision: 0.01 })),
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_DIM_D4",
                    values: [
                        {
                            value: String(faker.number.float({ min:3, max:12, precision: 0.01 })),
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_ALL_RACC_TXT",
                    values: [
                        {
                            value: allracc,
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_DIM_D1_TXT",
                    values: [],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_DIM_D2_TXT",
                    values: [],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_DIM_D3_TXT",
                    values: [],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_DIM_D4_TXT",
                    values: [],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_BANC",
                    values: [
                        {
                            value: faker.helpers.arrayElement(["NON","OUI"]),
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_ESCALIER_NEW_1",
                    values: [
                        {
                            value: faker.helpers.arrayElement(["ENJOY","ORBIS", "PIANO", "ESCALIA"]),
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_ESCALIER_NEW_1_IN_OUT",
                    values: [
                        {
                            value: faker.helpers.arrayElement(["IN","OUT"]),
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_ESCALIER_NEW_1_PERIM_STRUCT",
                    values: [
                        {
                            value: String(faker.number.float({ min:3, max:12, precision: 0.001 })),
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_ESCALIER_NEW_1_SURF_NIV_EAU",
                    values: [
                        {
                            value: String(faker.number.float({ min:3, max:12, precision: 0.01 })),
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_ESCALIER_NEW_1_LONG_TABLIER",
                    values: [
                        {
                            value: String(faker.number.float({ min:3, max:12, precision: 0.01 })),
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_ESCALIER_NEW_1_LETTRE",
                    values: [
                        {
                            value: faker.helpers.arrayElement(["A","B","C","D","E","F","G","H"]),
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_ESCALIER_NEW_1_COULEUR",
                    values: [
                        {
                            value: faker.helpers.arrayElement(["GR_BEIGE","NON","GR_GRIS","BLANC_MOUCHETE","GRIS"]),
                            author: "User"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_ESCALIER_NEW_1_OPTIONS",
                    values: [
                        {
                            value: faker.helpers.arrayElement(["NON","OUI"]),
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_DIM_PERIM_SEQ01",
                    values: [
                        {
                            value: String(faker.number.float({ min:3, max:12, precision: 0.001 })),
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_DIM_CINTRE_SEQ01",
                    values: [
                        {
                            value: String(faker.number.int({ min:120, max:300 })),
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_DIM_PERIM_SEQ02",
                    values: [
                        {
                            value: String(faker.number.float({ min:3, max:12, precision: 0.001 })),
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_DIM_CINTRE_SEQ02",
                    values: [
                        {
                            value: `-${ faker.number.int({ min:120, max:300 }) }`,
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_DIM_PERIM_SEQ03",
                    values: [
                        {
                            value: String(faker.number.float({ min:3, max:12, precision: 0.001 })),
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_DIM_CINTRE_SEQ03",
                    values: [
                        {
                            value: String(faker.number.int({ min:120, max:300 })),
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_DIM_PERIM_SEQ04",
                    values: [
                        {
                            value: String(faker.number.float({ min:3, max:12, precision: 0.001 })),
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_DIM_CINTRE_SEQ04",
                    values: [
                        {
                            value: String(faker.number.int({ min:120, max:300 })),
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_DIM_PERIM_SEQ05",
                    values: [
                        {
                            value: String(faker.number.float({ min:0, max:1, precision: 0.001 })),
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_DIM_CINTRE_SEQ05",
                    values: [
                        {
                            value: faker.helpers.arrayElement(["DROIT","OBLIQUE"]),
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_DIM_PERIM_SEQ06",
                    values: [
                        {
                            value: String(faker.number.float({ min:0, max:1, precision: 0.001 })),
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_DIM_CINTRE_SEQ06",
                    values: [
                        {
                            value: String(faker.number.int({ min:120, max:300 })),
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_DIM_PERIM_SEQ07",
                    values: [
                        {
                            value: String(faker.number.float({ min:0, max:1, precision: 0.001 })),
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_DIM_CINTRE_SEQ07",
                    values: [
                        {
                            value: String(faker.number.int({ min:120, max:300 })),
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_DIM_PERIM_SEQ08",
                    values: [
                        {
                            value: String(faker.number.float({ min:0, max:1, precision: 0.001 })),
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_DIM_CINTRE_SEQ08",
                    values: [
                        {
                            value: String(faker.number.int({ min:0, max:10 })),
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_DIM_PERIM_SEQ09",
                    values: [
                        {
                            value: String(faker.number.float({ min:0, max:1, precision: 0.001 })),
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_DIM_CINTRE_SEQ09",
                    values: [
                        {
                            value: String(faker.number.int({ min:0, max:10 })),
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_DIM_PERIM_SEQ10",
                    values: [
                        {
                            value: String(faker.number.float({ min:0, max:1, precision: 0.001 })),
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_DIM_CINTRE_SEQ10",
                    values: [
                        {
                            value: String(faker.number.int({ min:0, max:10 })),
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_DIM_PERIM_SEQ11",
                    values: [
                        {
                            value: String(faker.number.float({ min:0, max:1, precision: 0.001 })),
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_DIM_CINTRE_SEQ11",
                    values: [
                        {
                            value: String(faker.number.int({ min:0, max:10 })),
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_DIM_PERIM_SEQ12",
                    values: [
                        {
                            value: String(faker.number.float({ min:0, max:1, precision: 0.001 })),
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_DIM_CINTRE_SEQ12",
                    values: [
                        {
                            value: String(faker.number.int({ min:0, max:10 })),
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_DIM_PERIM_FORME",
                    values: [
                        {
                            value: String(faker.number.float({ min:0, max:1, precision: 0.001 })),
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_HAUTEUR_MUR_1",
                    values: [
                        {
                            value: hauteur,
                            author: "User"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_HAUTEUR_MUR_1_TXT",
                    values: [
                        {
                            value: `H${ hauteur }`,
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_DIM_SURFACE",
                    values: [
                        {
                            value: String(faker.number.float({ min:3, max:12, precision: 0.01 })),
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_DIM_VOLUME",
                    values: [
                        {
                            value: String(faker.number.float({ min:3, max:12, precision: 0.01 })),
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_COEFF_PROFIL_VOL_M2",
                    values: [
                        {
                            value: String(faker.number.float({ min:0, max:12, precision: 0.01 })),
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_ESCALIER_NEW_1_VOL",
                    values: [
                        {
                            value: String(faker.number.float({ min:-12, max:12, precision: 0.1 })),
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_ESCALIER_PILIERS",
                    values: [
                        {
                            value: String(faker.number.int({ min:2, max:12 })),
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_TYPE_SAISIE",
                    values: [
                        {
                            value: "MOD_COMMERC",
                            author: "User"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_MARVIN",
                    values: [
                        {
                            value: "DONT_PANIC",
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_PERIM_STRU",
                    values: [
                        {
                            value: "12.57",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_ORIENTATION",
                    values: [
                        {
                            value: faker.helpers.arrayElement(["STANDARD","INVERSE"]),
                            author: "User"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_STRUCTURE",
                    values: [
                        {
                            value: "ALINE_R165",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_LIGNE_EQUIPEMENT",
                    values: [
                        {
                            value: faker.helpers.arrayElement(["ESSENTIEL","RELAX", "PERFORMANCE", "TOP"]),
                            author: "User"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_USAGE",
                    values: [
                        {
                            value: "FAMILIAL",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_GABARIT",
                    values: [
                        {
                            value: "NON",
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_ISOPLAN",
                    values: [
                        {
                            value: "OUI",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_MARGELLE",
                    values: [
                        {
                            value: faker.helpers.arrayElement(["NON","KIT", "ORBIS", "PASO", "WELCOME"]),
                            author: "User"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_MEMBRANE",
                    values: [
                        {
                            value: "LINER",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_MEMBRANE_COULEUR",
                    values: [
                        {
                            value: faker.helpers.arrayElement(["AZUR","G_SOURIS", "GRIS_ARG", "MARB_ARD", "MOS_SABLE", "TOSCANE"]),
                            author: "User"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_MEMBRANE_COULEUR_TYPE",
                    values: [
                        {
                            value: "UNI",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_PCE_SCEL_COULEUR",
                    values: [
                        {
                            value: "AZUR",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_FIX_MEMB_LINER",
                    values: [
                        {
                            value: "OVERLAP",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_FIX_MEMB_STRUCT",
                    values: [
                        {
                            value: "FIRE",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_SKIM_COUL",
                    values: [
                        {
                            value: "BLANC",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_MEDIA_FILTRANT",
                    values: [
                        {
                            value: "EBAG",
                            author: "User"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_LOCAL_FILTRATION",
                    values: [
                        {
                            value: "FILWAT",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_POMPE_MOD",
                    values: [
                        {
                            value: faker.helpers.arrayElement(["P35","P40","P33","P50", "P75", "P150"]),
                            author: "User"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_POMPE_MOD_ACT",
                    values: [
                        {
                            value: "P35",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_CAPOT_FCS_ECOR",
                    values: [
                        {
                            value: faker.helpers.arrayElement(["CAPOT_BEIGE","CAPOT_GRIS", "NON"]),
                            author: "User"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_POMPE_NIV_PUISSANCE",
                    values: [
                        {
                            value: "STANDARD",
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_FILTRE_MOD",
                    values: [
                        {
                            value: faker.helpers.arrayElement(["OUI","NON"]),
                            author: "User"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_COFFRET_ELEC_MOD",
                    values: [
                        {
                            value: "6,3_10A_30MA",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_IOT_AC1",
                    values: [
                        {
                            value: "NON",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_IOT_BPC",
                    values: [
                        {
                            value: "NON",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_IOT_CPR",
                    values: [
                        {
                            value: "NON",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_PLUGIN",
                    values: [
                        {
                            value: "NON",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_SKIM_MOD",
                    values: [
                        {
                            value: "NON",
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_SKIM_QTE",
                    values: [
                        {
                            value: "0",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_SKIM_QTE_SUPP_PAY",
                    values: [
                        {
                            value: "0",
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_SKIM_QTE_SUPP",
                    values: [
                        {
                            value: "0",
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_SKIM_QTE_TOTAL",
                    values: [
                        {
                            value: "0",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_REF_MOD",
                    values: [
                        {
                            value: "DIA75_H305AXE",
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_REF_QTE",
                    values: [
                        {
                            value: "1",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_REF_QTE_SUPP_PAY",
                    values: [
                        {
                            value: "0",
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_REF_QTE_SUPP",
                    values: [
                        {
                            value: "0",
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_REF_QTE_TOTAL",
                    values: [
                        {
                            value: "1",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_REF_ESCA_QTE",
                    values: [
                        {
                            value: "0",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_REF_ESCA_QTE_SUPP",
                    values: [
                        {
                            value: "0",
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_REF_STRUCT_QTE",
                    values: [
                        {
                            value: "1",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_BDF_MOD",
                    values: [
                        {
                            value: "NON",
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_BDF_QTE",
                    values: [
                        {
                            value: "0",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_BDF_QTE_SUPP_PAY",
                    values: [
                        {
                            value: "0",
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_BDF_QTE_SUPP",
                    values: [
                        {
                            value: "0",
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_BDF_QTE_TOTAL",
                    values: [
                        {
                            value: "0",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_PN_MOD",
                    values: [
                        {
                            value: "DIA75_H305AXE",
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_PN_QTE",
                    values: [
                        {
                            value: "0",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_PN_QTE_SUPP",
                    values: [
                        {
                            value: "0",
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_PN_QTE_SUPP_PAY",
                    values: [
                        {
                            value: "0",
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_PN_QTE_TOTAL",
                    values: [
                        {
                            value: "0",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_PC_MOD",
                    values: [
                        {
                            value: "DIA75_H305AXE",
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_PC_QTE",
                    values: [
                        {
                            value: "0",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_PC_QTE_SUPP",
                    values: [
                        {
                            value: "0",
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_PC_QTE_SUPP_PAY",
                    values: [
                        {
                            value: "0",
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_PLOMB_SUPP",
                    values: [
                        {
                            value: faker.helpers.arrayElement(["NON", "BP_FCS", "BP_LC2", "BP_LT", "BP_CHAUFFAGE", "BP_ELECTROLYS", "REGUL_NIVEAU", "PLOMB_EVAC", "PLOMB_CASC", "PLOMB_VIDANGE"]),
                            author: "User"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_PC_QTE_TOTAL",
                    values: [
                        {
                            value: "0",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_PROJ_STRUCT_LUM_BLANC_MOD",
                    values: [
                        {
                            value: "DIA260_H720AXE",
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_PROJ_STRUCT_LUM_BLANC_QTE",
                    values: [
                        {
                            value: "1",
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_PROJ_STRUCT_LUM_COUL_MOD",
                    values: [
                        {
                            value: "NON",
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_PROJ_STRUCT_LUM_COUL_QTE",
                    values: [
                        {
                            value: "0",
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_PROJ_ESCA_LUM_BLANC_MOD",
                    values: [
                        {
                            value: "NON",
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_PROJ_ESCA_LUM_BLANC_QTE",
                    values: [
                        {
                            value: "0",
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_PROJ_ESCA_LUM_COUL_MOD",
                    values: [
                        {
                            value: "NON",
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_PROJ_ESCA_LUM_COUL_QTE",
                    values: [
                        {
                            value: "0",
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_MARGELLE_ASPECT",
                    values: [
                        {
                            value: faker.helpers.arrayElement(["NON","STONE_ECRUE", "MINERAL_GRISE"]),
                            author: "User"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_NACC_MOD",
                    values: [
                        {
                            value: "NON",
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_NACC_QTE",
                    values: [
                        {
                            value: "0",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_ELECTROLYSEUR",
                    values: [
                        {
                            value: faker.helpers.arrayElement(["NON","SILVER30", "SILVER50", "SILVER70", "GOLD50", "GOLD70", "GOLD90", "SILVER30FCS", "SILVER50FCS"]),
                            author: "User"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_REGUL_PH",
                    values: [
                        {
                            value: "NON",
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_POMPE_CHALEUR",
                    values: [
                        {
                            value: "NON",
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_DATE_PRIX",
                    values: [],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_DATE_LIV",
                    values: [],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_SA",
                    values: [
                        {
                            value: "01",
                            author: "User"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_ORG_COM",
                    values: [
                        {
                            value: "FREX",
                            author: "User"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_AG_COM",
                    values: [
                        {
                            value: "FREX",
                            author: "User"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_TYPE_DOC_VENTE",
                    values: [],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_PRIX",
                    values: [
                        {
                            value: "PISCINE_SOFIA06",
                            author: "System"
                        },
                        {
                            value: "PV_PERFORMANCE_FCS_ECOR",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_PROMO_EXCEPTIONNELLE",
                    values: [
                        {
                            value: "NON",
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_PROMO_MOD_MAX",
                    values: [
                        {
                            value: "0.00",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_PROMO_MOD_MONTANT",
                    values: [
                        {
                            value: "0.00",
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "RV_COMMISSION",
                    values: [
                        {
                            value: "0",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_PAYS_INSTALLATION",
                    values: [
                        {
                            value: "DE",
                            author: "User"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_ZONE_INSTALLATION",
                    values: [],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_MODE_TRANSPORT",
                    values: [
                        {
                            value: "TERRESTRE",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_FREQ_ELEC",
                    values: [
                        {
                            value: "50",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_EP",
                    values: [
                        {
                            value: "EP2",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_ECHELLE_MOD",
                    values: [
                        {
                            value: "NON",
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_ECHELLE_QTE",
                    values: [
                        {
                            value: "0",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_ECHELLE_SUPP",
                    values: [
                        {
                            value: "0",
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_ECHELLE_TOTAL",
                    values: [
                        {
                            value: "0",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_ARTICULATION_ECHELLE",
                    values: [
                        {
                            value: "0",
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_COUV_SEC",
                    values: [
                        {
                            value: faker.helpers.arrayElement(["NON","WATERTOP","SECURIWAT","SOLAE"]),
                            author: "User"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_BOUNDING_BOX",
                    values: [
                        {
                            value: "MBB",
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_BOUNDING_BOX_LONG",
                    values: [
                        {
                            value: "6.01",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_BOUNDING_BOX_LARG",
                    values: [
                        {
                            value: "3.51",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_SWAT_COULEUR",
                    values: [
                        {
                            value: "NON",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_SWAT_PLAGE",
                    values: [
                        {
                            value: "NON",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_WTOP_COULEUR",
                    values: [
                        {
                            value: faker.helpers.arrayElement(["AMANDE","BEIGE","BLEU","GRISE","TAUPE"]),
                            author: "User"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_WTOP_PLAGE",
                    values: [
                        {
                            value: faker.helpers.arrayElement(["BETON","BOIS"]),
                            author: "User"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_WTOP_STK",
                    values: [
                        {
                            value: faker.helpers.arrayElement(["FP","MF"]),
                            author: "User"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_SOLAE_COULEUR",
                    values: [
                        {
                            value: "NON",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_SOLAE_PLAGE",
                    values: [
                        {
                            value: "NON",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_SOLAE_ENROUL_SOLAE",
                    values: [
                        {
                            value: faker.helpers.arrayElement(["NON","AUCUN", "VEKTOR"]),
                            author: "User"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_SOLAE_ENROUL",
                    values: [
                        {
                            value: "NON",
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_SOLAE_STK",
                    values: [
                        {
                            value: "NON",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_ED",
                    values: [
                        {
                            value: "NON",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_ED_COULEUR",
                    values: [
                        {
                            value: "NON",
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_NETTOYEUR",
                    values: [
                        {
                            value: "NON",
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_PRESTATION",
                    values: [
                        {
                            value: "NON",
                            author: "Default"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_ACC_01",
                    values: [],
                    possibleValues: "only a mock"
                },
                {
                    id: "W_ACC_02",
                    values: [],
                    possibleValues: "only a mock"
                },
                {
                    id: "PISCINE_CONNECTEE",
                    values: [
                        {
                            value: "NON",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "MBB_LARG",
                    values: [
                        {
                            value: "3.51",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                },
                {
                    id: "MBB_LONG",
                    values: [
                        {
                            value: "6.01",
                            author: "System"
                        }
                    ],
                    possibleValues: "only a mock"
                }
            ]
        }
    }
}