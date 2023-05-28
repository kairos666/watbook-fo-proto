import { Stair } from "@/types/Stair";
import { fakerFR as faker } from '@faker-js/faker';
import { fakerEN } from '@faker-js/faker';
import { ProductIllustrationBuilder } from "./GenericsBuilders";

function StairBuilder():Stair {
    const illustrationsCount:number = faker.number.int({ min:3, max:8 });

    return {
        id: faker.string.uuid(),
        libelle: faker.commerce.product(),
        attributes: [
            {
                libelle: "coloris",
                values: [
                    {
                        libelle: faker.color.human(),
                        illustration: faker.image.urlLoremFlickr({ category: fakerEN.color.human(), width: 600, height: 400 })
                    }
                ]
            }
        ],
        silouhette: faker.image.image(200, 200),
        illustrations: new Array(illustrationsCount).fill(null).map(() => ProductIllustrationBuilder("poolstairs"))
    }
}

export default StairBuilder;