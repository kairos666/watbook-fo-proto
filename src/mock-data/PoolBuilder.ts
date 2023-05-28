import { Pool } from "@/types/Pool";
import { fakerFR as faker } from '@faker-js/faker';
import { ProductIllustrationBuilder } from "./GenericsBuilders";

function PoolBuilder():Pool {
    const forme:"rectangulaire"|"ovale"|"irrégulière"|"slim" = faker.helpers.arrayElement(["rectangulaire","ovale","irrégulière","slim"]);
    const taillesCount:number = faker.number.int({ min:1, max:8 });
    const illustrationsCount:number = faker.number.int({ min:3, max:8 });
    
    function tailleBuilder(index:number) {
        const offsetCount:number = faker.number.int({ min:0, max:4 });

        return {
            suffix: String(index + 1),
            longueurA: faker.number.float({ min:3, max:9, precision: 0.01 }),
            largeurB: faker.number.float({ min:2, max:6, precision: 0.01 }),
            largeurC: faker.number.float({ min:1.5, max:4, precision: 0.01 }),
            superficie: faker.number.float({ min:9, max:50, precision: 0.01 }),
            panelOffset: faker.helpers.uniqueArray([-2, -1, 1, 2], offsetCount)
        }
    }

    return {
        id: faker.string.uuid(),
        libelle: faker.person.firstName('female'),
        forme,
        estInversable: (forme === "irrégulière"),
        tailles: new Array(taillesCount).fill(null).map((_value, index) => tailleBuilder(index)),
        silouhette: faker.image.image(200, 200),
        illustrations: new Array(illustrationsCount).fill(null).map(() => ProductIllustrationBuilder("pool"))
    }
}

export default PoolBuilder;