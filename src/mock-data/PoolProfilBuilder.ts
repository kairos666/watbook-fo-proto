import { Profil } from '@/types/PoolProfil';
import { fakerFR as faker } from '@faker-js/faker';
import { ProductIllustrationBuilder } from "./GenericsBuilders";

function PoolProfilBuilder():Profil {
    const usage:"Détente"|"Jeux"|"Natation sportive"|"Plongeon" = faker.helpers.arrayElement(["Détente","Jeux","Natation sportive","Plongeon"]);
    const fond:"plat"|"incurvé"|"diamant"|"mini-fosse" = faker.helpers.arrayElement(["plat","incurvé","diamant","mini-fosse"]);
    const illustrationsCount:number = faker.number.int({ min:3, max:8 });

    return {
        id: faker.string.uuid(),
        libelle: faker.commerce.product(),
        usage,
        fond,
        taille: {
            hMin: faker.number.int({ min:50, max:120 }),
            hMax: faker.number.int({ min:120, max:300 }),
            hFixe: faker.number.int({ min:50, max:110 }),
            Volume: faker.number.float({ min:9, max:50, precision: 0.01 })
        },
        illustrations: new Array(illustrationsCount).fill(null).map(() => ProductIllustrationBuilder("blueprint"))
    }
}

export default PoolProfilBuilder;